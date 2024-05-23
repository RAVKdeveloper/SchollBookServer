import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Student } from 'src/core/accounts/student/entities/student.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Class } from '../class/entities/class.entity'
import { ClassSchedule } from './entities/class-schedule.entity'
import { DaySchedule } from './entities/day-schedule.entity'
import { ClassScheduleService } from './class-schedule.service'
import { ClassScheduleController } from './class-schedule.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Lesson, Teacher, Student, Point, ClassSchedule, DaySchedule]),
  ],
  controllers: [ClassScheduleController],
  providers: [ClassScheduleService],
})
export class ClassScheduleModule {}
