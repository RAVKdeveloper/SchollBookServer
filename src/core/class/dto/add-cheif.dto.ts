import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddChiefClassDto {
  @ApiProperty({ example: 1, description: 'Class id' })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({ example: 6, description: 'Teacher id' })
  @IsNotEmpty()
  @IsNumber()
  readonly teacherId: number
}
