import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreatePointSystemDto {
  @ApiProperty({ example: 5, description: 'Point' })
  @IsNotEmpty()
  readonly point: string

  @ApiProperty({ description: 'Description point', example: 'Отлично', required: false })
  @IsNotEmpty()
  readonly description?: string

  @ApiProperty({ description: 'School id', example: 62 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Student id', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  readonly studentId: number

  @ApiProperty({ description: 'Lesson id', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  readonly lessonId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({ description: 'Day id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly dayId: number
}
