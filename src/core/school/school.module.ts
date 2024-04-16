import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Owner } from '../accounts/owner/entities/owner.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Student } from '../accounts/student/entities/student.entity'
import { School } from './entities/school.entity'
import { SchoolService } from './school.service'
import { SchoolController } from './school.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Owner, School, Student, Teacher, Lesson])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
