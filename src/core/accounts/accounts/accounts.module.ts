import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtGenService } from 'src/core/jwt/jwt.service'

import { Class } from 'src/core/class/entities/class.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Parent } from './entities/parent.entity'
import { Student } from './entities/student.entity'

import { AccountsController } from './accounts.controller'
import { AccountsService } from './accounts.service'

@Module({
  imports: [TypeOrmModule.forFeature([School, Student, User, Class, Point, Parent])],
  controllers: [AccountsController],
  providers: [AccountsService, JwtGenService],
})
export class AccountsModule {}
