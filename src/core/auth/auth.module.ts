import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { JwtGenService } from '../jwt/jwt.service'
import { MailService } from '../mail/mail.service'
import { AuthCode } from './entities/authCode.entity'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthCode])],
  controllers: [AuthController],
  providers: [AuthService, JwtGenService, MailService],
})
export class AuthModule {}
