import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateClassDto {
  @ApiProperty({ example: 10, description: 'Class name' })
  @IsNotEmpty()
  @IsNumber()
  readonly name: number

  @ApiProperty({ example: 'A', description: 'Class parallel' })
  @IsNotEmpty()
  @IsString()
  readonly parallel: string

  @ApiProperty({ example: 62, description: 'School id' })
  @IsNotEmpty()
  @IsNumber()
  readonly school: number
}
