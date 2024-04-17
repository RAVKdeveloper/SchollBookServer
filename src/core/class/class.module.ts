import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { School } from '../school/entities/school.entity'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Class } from './entities/class.entity'
import { ClassService } from './class.service'
import { ClassController } from './class.controller'

@Module({
  imports: [TypeOrmModule.forFeature([School, Lesson, Teacher, Class])],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
