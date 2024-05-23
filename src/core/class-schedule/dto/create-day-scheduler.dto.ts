import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import type { Day } from './create-class-schedule.dto'

export class CreateDaySchedulerDto {
  @ApiProperty({ example: 21, description: 'Scheduler id' })
  @IsNotEmpty()
  @IsNumber()
  readonly schedulerId: number

  @ApiProperty({
    description: 'Days scheduler',
    example: { activeTeachersId: 1, lessonsId: 6, dayName: 'Friday', time: '8:00-8:45' },
  })
  @IsNotEmpty()
  readonly day: Day
}
