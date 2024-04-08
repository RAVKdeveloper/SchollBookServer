import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'

import { User } from '../user/entities/user.entity'
import { JwtGenService } from '../jwt/jwt.service'
import { MailService } from '../mail/mail.service'
import { AuthCode } from './entities/authCode.entity'

import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdatePasswordDto } from './dto/update-pass.dto'
import { ForgotPassDto } from './dto/forgot-pass.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { VerifyCodeDto } from './dto/verify-code.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(AuthCode) private verifyCodeRepo: Repository<AuthCode>,
    private readonly tokenService: JwtGenService,
    private readonly mailService: MailService,
  ) {}

  async register(dto: CreateAuthDto, res: Response) {
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

    const acces_token = await this.tokenService.generateTokens({
      userId: user.id,
      userName: user.name,
    })

    res.cookie('acces_token_auth', acces_token, { httpOnly: true })

    return user
  }

  async login(dto: LoginAuthDto, res: Response) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })

    if (!user) throw new NotFoundException('Неверный логин или пароль')

    const isValidPass = await bcrypt.compare(dto.password, user.password)

    if (!isValidPass) throw new ForbiddenException('Неверный логин или пароль')

    await this.userRepo.update({ email: user.email, id: user.id }, { isActivated: false })

    const acces_token = await this.tokenService.generateTokens({
      userId: user.id,
      userName: user.name,
    })

    const code = await this.createAuthCode(user)

    await this.mailService.sendAuthOneCod({
      code: code,
      to: user.email,
    })

    res.cookie('acces_token_auth', acces_token, { httpOnly: true })

    return user
  }

  async createAuthCode(user: User): Promise<number> {
    const code = Math.floor(Math.random() * 10000)
    const createCode = await this.verifyCodeRepo.save({ code, userId: user })
    return createCode.code
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

  async passwordUpdate(dto: UpdatePasswordDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.id } })

    if (!user) throw new NotFoundException('Такого пользователя не существует')

    await this.verifyAccount({ userId: dto.id, code: dto.code })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    await this.userRepo.update({ id: dto.id }, { password: hashPassword })

    await this.mailService.updatePassword(user.email)

    return { message: 'Пароль изменён' }
  }

  async verifyAccount(dto: VerifyCodeDto) {
    const { userId, code } = dto

    const codeVer = await this.verifyCodeRepo.findOne({
      where: { code, userId: { id: userId } },
    })

    console.log(await this.verifyCodeRepo.find({ where: { userId: { id: userId } } }))

    if (!codeVer) throw new ForbiddenException('Неверный код доступа')

    await this.userRepo.update({ id: userId }, { isActivated: true })

    await this.verifyCodeRepo.delete({ userId: { id: userId } })

    return { message: 'Аккаунт подтверждён' }
  }
}
