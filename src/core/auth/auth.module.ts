import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/entities/user.entity'
import { JwtGenService } from '../jwt/jwt.service'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtGenService],
})
export class AuthModule {}
