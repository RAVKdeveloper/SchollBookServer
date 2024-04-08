import { IsEmail } from 'class-validator'

export class LoginMailDto {
  @IsEmail()
  readonly email: string
}
