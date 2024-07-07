import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

import { DayScheduleDto } from './day-schedule.dto'

export class CreateDaySchedulerDto extends DayScheduleDto {
  @ApiProperty({ example: 21, description: 'Scheduler id' })
  @IsNotEmpty()
  @IsNumber()
  readonly schedulerId: number
}
