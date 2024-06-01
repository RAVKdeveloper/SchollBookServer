import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class AddEmptyStudentInScheduleDto {
  @ApiProperty({ description: 'Day ID', example: 14 })
  @IsNotEmpty()
  @IsNumber()
  readonly dayId: number

  @ApiProperty({ description: 'Student ids', example: [1, 2], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly studentsId: number[]
}
