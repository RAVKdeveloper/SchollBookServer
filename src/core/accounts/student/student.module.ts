import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { Student } from './entities/student.entity'

import { StudentService } from './student.service'
import { StudentController } from './student.controller'

@Module({
  imports: [TypeOrmModule.forFeature([School, Student, User, Class, Point])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
