import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateLessonDto {
  @ApiProperty({ example: 'Математика', description: 'Lesson name' })
  @IsNotEmpty()
  readonly lessonName: string

  @IsNotEmpty()
  @ApiProperty({ example: 62, description: 'School id' })
  readonly school: number
}
