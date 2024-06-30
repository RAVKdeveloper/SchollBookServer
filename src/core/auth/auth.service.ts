import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'
import { Repository } from 'typeorm'

import { JwtGenService } from '../jwt/jwt.service'
import { MailService } from '../mail/mail.service'
import { User } from '../user/entities/user.entity'
import { AuthCode } from './entities/authCode.entity'

import { CreateAuthDto } from './dto/create-auth.dto'
import { ForgotPassDto } from './dto/forgot-pass.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UpdatePasswordDto } from './dto/update-pass.dto'
import { VerifyCodeDto } from './dto/verify-code.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AuthCode) private verifyCodeRepo: Repository<AuthCode>,
    private readonly tokenService: JwtGenService,
    private readonly mailService: MailService,
  ) {}

  async register(dto: CreateAuthDto) {
    const isEmptyUser = await this.userRepo.findOne({ where: { email: dto.email } })

    if (isEmptyUser) throw new ForbiddenException('Такой пользователь уже существует')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepo.save({
      ...dto,
      password: hashPassword,
    })

    const code = await this.createAuthCode({ ...user, password })

    await this.mailService.sendAuthOneCod({ to: user.email, code })

    return user
  }

  async login(dto: LoginAuthDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })

    if (!user) throw new NotFoundException('Неверный логин или пароль')

    const isValidPass = await bcrypt.compare(dto.password, user.password)

    if (!isValidPass) throw new ForbiddenException('Неверный логин или пароль')

    const code = await this.createAuthCode(user)

    await this.mailService.sendAuthOneCod({
      code: code,
      to: user.email,
    })

    return user
  }

  private async createAuthCode(user: User): Promise<number> {
    const code = Math.ceil(Math.random() * 10000)

    const salt = await bcrypt.genSalt(10)
    const hashCode = await bcrypt.hash(code.toString(), salt)

    await this.verifyCodeRepo.save({ code: hashCode, userId: user })

    return code
  }

  async me(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepo.findOne({
      where: { id },
    })

    if (!user) throw new NotFoundException('Пользователь с таким id небыл найден')

    if (user.isActivated === false) throw new ForbiddenException('Аккаунт не активирован')

    return user
  }

  async forgotPass(dto: ForgotPassDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })

    if (!user) throw new NotFoundException('Такого пользователя не существует')

    const code = await this.createAuthCode(user)

    await this.mailService.sendAuthOneCod({
      code: code,
      to: user.email,
    })

    return user
  }

  async passwordUpdate(dto: UpdatePasswordDto, res: Response) {
    const user = await this.userRepo.findOne({ where: { id: dto.id } })

    if (!user) throw new NotFoundException('Такого пользователя не существует')

    await this.verifyAccount({ userId: dto.id, code: dto.code }, res)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    await this.userRepo.update({ id: dto.id }, { password: hashPassword })

    await this.mailService.updatePassword(user.email)

    return { message: 'Пароль изменён' }
  }

  async verifyAccount(dto: VerifyCodeDto, res: Response) {
    const { userId, code } = dto

    const codeVer = await this.verifyCodeRepo.findOne({
      where: { userId: { id: userId } },
      relations: { userId: true },
      order: {
        id: 'DESC',
      },
    })

    if (!codeVer) throw new ForbiddenException('Неверный код доступа')

    const isValidCode = await bcrypt.compare(code.toString(), codeVer.code)

    if (!isValidCode) throw new ForbiddenException('Неверный код доступа')

    await this.verifyCodeRepo.delete({ userId: { id: userId } })

    await this.mailService.loginMail({ email: codeVer.userId.email })

    const access_token = await this.tokenService.generateTokens({
      userId: codeVer.userId.id,
      userName: codeVer.userId.name,
    })

    res.cookie('access_token_auth', access_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return { message: 'Аккаунт подтверждён' }
  }

  async logout(res: Response) {
    res.clearCookie('access_token_auth', { httpOnly: true })

    res.end()

    return 'Ok'
  }
}
