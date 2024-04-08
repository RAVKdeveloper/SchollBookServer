import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class VerifyCodeDto {
  @ApiProperty({ example: 1324 })
  @IsNotEmpty()
  userId: number

  @ApiProperty({ example: 1111 })
  @IsNotEmpty()
  code: number
}
