import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePointSystemDto {
  @ApiProperty({ description: 'Update point', example: '4' })
  @IsNotEmpty()
  readonly point: string

  @ApiProperty({ description: 'Poin id', example: 3 })
  @IsNotEmpty()
  readonly id: number
}
