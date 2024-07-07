import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Student } from '../accounts/accounts/entities/student.entity'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { ClassSchedule } from '../class-schedule/entities/class-schedule.entity'
import { HomeWork } from '../home-work/entities/home-work.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { MailService } from '../mail/mail.service'
import { Point } from '../point-system/entities/point-system.entity'
import { School } from '../school/entities/school.entity'
import { User } from '../user/entities/user.entity'
import { Class } from './entities/class.entity'

import { ClassController } from './class.controller'
import { ClassService } from './class.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      School,
      Lesson,
      Teacher,
      Class,
      Student,
      User,
      Point,
      ClassSchedule,
      HomeWork,
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, MailService],
})
export class ClassModule {}
