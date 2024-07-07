import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateParentAccDto {
  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number
}
