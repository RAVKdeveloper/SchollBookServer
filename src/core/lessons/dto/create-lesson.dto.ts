import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateLessonDto {
  @ApiProperty({ example: 'Математика', description: 'Lesson name' })
  @IsNotEmpty()
  readonly lessonName: string

  @IsNotEmpty()
  @ApiProperty({ example: 62, description: 'School id' })
  readonly school: number

  @ApiProperty({ example: 1, description: 'Class id' })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({ example: [1], description: 'Teachers id', required: false, isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly teachersId: number[]
}
