import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Student } from 'src/core/accounts/accounts/entities/student.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { Class } from '../class/entities/class.entity'
import { HomeWork } from '../home-work/entities/home-work.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { ClassSchedule } from './entities/class-schedule.entity'
import { DaySchedule } from './entities/day-schedule.entity'

import { ClassScheduleController } from './class-schedule.controller'
import { ClassScheduleService } from './class-schedule.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class,
      Lesson,
      Teacher,
      Student,
      Point,
      ClassSchedule,
      DaySchedule,
      HomeWork,
    ]),
  ],
  controllers: [ClassScheduleController],
  providers: [ClassScheduleService],
})
export class ClassScheduleModule {}
