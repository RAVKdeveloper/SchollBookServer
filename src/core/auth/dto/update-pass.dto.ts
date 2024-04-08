import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePasswordDto {
  @ApiProperty({ example: '1', description: 'User id' })
  @IsNotEmpty()
  readonly id: number

  @ApiProperty({ example: '1234567', description: 'Password user' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  readonly password: string
  code: number
}
