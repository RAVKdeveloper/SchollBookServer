import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPassDto {
  @ApiProperty({ example: 'schoolbook@example.com', description: 'Email' })
  @IsEmail()
  readonly email: string
}
