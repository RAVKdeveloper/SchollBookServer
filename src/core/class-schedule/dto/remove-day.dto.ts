import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class RemoveDayInScheduleDto {
  @ApiProperty({ description: 'Week schedule id', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleId: number

  @ApiProperty({ description: 'Days schedule id', example: [1], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly daysId: number[]
}
