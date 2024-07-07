import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Student } from '../accounts/accounts/entities/student.entity'
import { DaySchedule } from '../class-schedule/entities/day-schedule.entity'
import { Class } from '../class/entities/class.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { School } from '../school/entities/school.entity'
import { Point } from './entities/point-system.entity'

import { PointSystemController } from './point-system.controller'
import { PointSystemService } from './point-system.service'

@Module({
  imports: [TypeOrmModule.forFeature([Point, Student, School, Lesson, Class, DaySchedule])],
  controllers: [PointSystemController],
  providers: [PointSystemService],
})
export class PointSystemModule {}
