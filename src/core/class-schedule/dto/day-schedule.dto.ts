import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsNotEmpty } from 'class-validator'

export class DayScheduleDto {
  @ApiProperty({ description: 'Array teachers id', example: [1], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly activeTeachersId: number[]

  @ApiProperty({ description: 'Array lesson id', example: [1], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly lessonsId: number[]

  @ApiProperty({ description: 'Day name', example: 'Monday' })
  @IsNotEmpty()
  readonly dayName: string

  @ApiProperty({ description: 'Open time work', example: '8:00-8:45' })
  @IsNotEmpty()
  readonly time: string

  @ApiProperty({ description: 'Date this day', example: '2202/03/03' })
  @IsNotEmpty()
  @IsDateString()
  readonly date: string
}
