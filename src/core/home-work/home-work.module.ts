import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DaySchedule } from '../class-schedule/entities/day-schedule.entity'
import { Class } from '../class/entities/class.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { User } from '../user/entities/user.entity'
import { HomeWork } from './entities/home-work.entity'

import { HomeWorkController } from './home-work.controller'
import { HomeWorkService } from './home-work.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson, DaySchedule, HomeWork, Class])],
  controllers: [HomeWorkController],
  providers: [HomeWorkService],
})
export class HomeWorkModule {}
