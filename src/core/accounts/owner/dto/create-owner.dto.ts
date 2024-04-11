import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOwnerDto {
  @ApiProperty({ example: 62, description: 'School Id' })
  @IsNotEmpty()
  readonly school: number
}
