import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from '../user/entities/user.entity'
import { JwtGenService } from '../jwt/jwt.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly tokenService: JwtGenService,
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

    const acces_token = await this.tokenService.generateTokens({
      userId: user.id,
      userName: user.name,
    })

    return { user, acces_token }
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
