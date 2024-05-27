import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ClassSchedule } from '../class-schedule/entities/class-schedule.entity'
import { DaySchedule } from '../class-schedule/entities/day-schedule.entity'

import { SheduleActionsController } from './shedule-actions.controller'
import { SheduleActionsService } from './shedule-actions.service'

@Module({
  imports: [TypeOrmModule.forFeature([DaySchedule, ClassSchedule])],
  controllers: [SheduleActionsController],
  providers: [SheduleActionsService],
})
export class SheduleActionsModule {}
