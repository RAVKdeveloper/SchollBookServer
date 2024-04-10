import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStudentDto {
  @ApiProperty({ example: '1', description: 'User id' })
  @IsNotEmpty()
  readonly userId: string
}
