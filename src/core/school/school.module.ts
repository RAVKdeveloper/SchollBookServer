import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Student } from '../accounts/accounts/entities/student.entity'
import { Owner } from '../accounts/owner/owner.entity'
import { Class } from '../class/entities/class.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { School } from './entities/school.entity'
import { SchoolController } from './school.controller'
import { SchoolService } from './school.service'

@Module({
  imports: [TypeOrmModule.forFeature([Owner, School, Student, Teacher, Lesson, Class])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
