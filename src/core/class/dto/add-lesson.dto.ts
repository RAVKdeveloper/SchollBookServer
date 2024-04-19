import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddLessonToClassDto {
  @ApiProperty({ description: 'Lesson id', example: 6 })
  @IsNotEmpty()
  @IsNumber()
  readonly lessonId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number
}
