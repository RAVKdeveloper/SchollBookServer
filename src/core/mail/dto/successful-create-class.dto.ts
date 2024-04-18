import { IsNotEmpty } from 'class-validator'

export class MailSuccessfulCreateClassDto {
  @IsNotEmpty()
  readonly email: string

  @IsNotEmpty()
  readonly class: string

  @IsNotEmpty()
  readonly school: string

  @IsNotEmpty()
  readonly createrUsername: string
}
