import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

import { DayScheduleDto } from './day-schedule.dto'

export class CreateClassScheduleDto {
  @ApiProperty({ example: 1, description: 'Class id' })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({
    description: 'Days schedule',
    isArray: true,
    type: DayScheduleDto,
  })
  @IsNotEmpty()
  @IsArray()
  readonly days: DayScheduleDto[]
}
