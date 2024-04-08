import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginAuthDto {
  @ApiProperty({ example: 'schoolbook@example.com', description: 'User email' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: '323553', description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  readonly password: string
}
