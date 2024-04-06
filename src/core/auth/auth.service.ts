import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Response } from 'express'

import { User } from '../user/entities/user.entity'
import { JwtGenService } from '../jwt/jwt.service'
import { MailService } from '../mail/mail.service'
import { AuthCode } from './entities/authCode.entity'

import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

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

    res.cookie('acces_token', acces_token, { httpOnly: true })

    return user
  }

  async createAuthCode(user: User): Promise<number> {
    const code = Math.floor(Math.random() * 10000)
    const createCode = await this.verifyCodeRepo.save({ code, user })
    return createCode.code
  }

  findAll() {
    return this.userRepo.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return updateAuthDto
  }

  remove(id: number) {
    return this.userRepo.delete({ id })
  }
}
