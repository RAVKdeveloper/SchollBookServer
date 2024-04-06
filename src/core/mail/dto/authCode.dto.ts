import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthCodeDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Recipients email' })
  @IsEmail()
  readonly to: string

  @ApiProperty({ example: '1111', description: 'Verification code' })
  @IsNotEmpty()
  readonly code: number
}
