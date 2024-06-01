import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateHomeWorkDto {
  @ApiProperty({ description: 'Title', example: 'Home work 2' })
  @IsOptional()
  @IsString()
  readonly title: string

  @ApiProperty({ description: 'Descriptions', example: 'Description 2' })
  @IsOptional()
  @IsString()
  readonly description: string

  @ApiProperty({ description: 'Day schedule id', example: 'Day schedule id' })
  @IsOptional()
  @IsNumber()
  readonly dayScheduleId: number
}
