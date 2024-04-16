import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddTeacherToLessonDto {
  @ApiProperty({ example: 5, description: 'Lesson id' })
  @IsNotEmpty()
  readonly lessonId: number

  @ApiProperty({ example: 4, description: 'Teacher id' })
  @IsNotEmpty()
  readonly teacherId: number
}
