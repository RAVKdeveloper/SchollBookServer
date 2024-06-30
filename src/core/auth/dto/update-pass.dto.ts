import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator'

export class UpdatePasswordDto {
  @ApiProperty({ example: '1', description: 'User id' })
  @IsNotEmpty()
  readonly id: number

  @ApiProperty({ example: '1234567', description: 'Password user' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  readonly password: string

  @ApiProperty({ example: 3235, description: 'Auth code' })
  @IsNotEmpty()
  @IsNumber()
  @MinLength(4)
  @MaxLength(4)
  code: number
}
