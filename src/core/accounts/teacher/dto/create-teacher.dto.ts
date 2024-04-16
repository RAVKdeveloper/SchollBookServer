import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTeacherDto {
  @ApiProperty({ example: 5, description: 'School id' })
  @IsNotEmpty()
  readonly school: number

  @ApiProperty({ example: '7:30 - 17:00', description: 'Opening times' })
  @IsNotEmpty()
  readonly OpeningTimes: string
}
