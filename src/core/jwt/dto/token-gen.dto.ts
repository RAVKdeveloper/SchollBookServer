import { IsNotEmpty } from 'class-validator'

export class TokensGenerateDto {
  @IsNotEmpty()
  readonly userId: number

  @IsNotEmpty()
  readonly userName: string
}
