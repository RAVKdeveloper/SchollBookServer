import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class QueryDayInScheduleDto {
  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  readonly schoolId: string

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  readonly classId: string

  @ApiProperty({ description: 'Date', example: '2024-05-26' })
  @IsNotEmpty()
  readonly date: string
}
