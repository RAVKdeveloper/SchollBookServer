import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStudentDto {
  @ApiProperty({ example: 62, description: 'School id' })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
