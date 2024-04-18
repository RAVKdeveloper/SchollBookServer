import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddStudentDto {
  @ApiProperty({ example: 1, description: 'Class id' })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({ example: 6, description: 'Student id' })
  @IsNotEmpty()
  @IsNumber()
  readonly studentId: number
}
