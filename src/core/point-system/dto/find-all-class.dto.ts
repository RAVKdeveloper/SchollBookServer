import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class FindAllClassPointsDto {
  @ApiProperty({ description: 'School id', example: 5 })
  @IsNotEmpty()
  readonly schoolId: string

  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  readonly classId: string
}
