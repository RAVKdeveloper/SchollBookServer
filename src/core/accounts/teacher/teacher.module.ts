import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from 'src/core/user/entities/user.entity'
import { School } from 'src/core/school/entities/school.entity'
import { Teacher } from './entities/teacher.entity'
import { TeacherService } from './teacher.service'
import { TeacherController } from './teacher.controller'

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher, School])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
