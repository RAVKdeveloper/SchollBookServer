import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { School } from '../school/entities/school.entity'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Class } from '../class/entities/class.entity'
import { Lesson } from './entities/lesson.entity'
import { LessonsService } from './lessons.service'
import { LessonsController } from './lessons.controller'

@Module({
  imports: [TypeOrmModule.forFeature([School, Teacher, Lesson, Class])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
