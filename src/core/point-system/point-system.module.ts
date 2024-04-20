import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Student } from '../accounts/student/entities/student.entity'
import { School } from '../school/entities/school.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Class } from '../class/entities/class.entity'
import { Point } from './entities/point-system.entity'

import { PointSystemService } from './point-system.service'
import { PointSystemController } from './point-system.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Point, Student, School, Lesson, Class])],
  controllers: [PointSystemController],
  providers: [PointSystemService],
})
export class PointSystemModule {}
