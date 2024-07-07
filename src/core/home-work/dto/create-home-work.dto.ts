import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateHomeWorkDto {
  @ApiProperty({ description: 'Title', example: 'Home work' })
  @IsNotEmpty()
  readonly title: string

  @ApiProperty({ description: 'Description', example: 'Description home work' })
  @IsNotEmpty()
  readonly description: string

  @ApiProperty({ description: 'Lesson id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly lessonId: number

  @ApiProperty({ description: 'Day schedule id', example: 14 })
  @IsNotEmpty()
  @IsNumber()
  readonly dayScheduleId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number
}
