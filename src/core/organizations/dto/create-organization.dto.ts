import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

export class CreateOrganizationDto {
  @ApiProperty({ description: 'Name', example: 'Pervie' })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ description: 'Description', example: 'Description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string

  @ApiProperty({ description: 'School id', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  readonly schoolId?: number

  @ApiProperty({ description: 'Tags', example: ['tag'], isArray: true })
  @IsNotEmpty()
  @IsArray()
  readonly tags: string[]

  @ApiProperty({ description: 'Is private', example: false })
  @IsNotEmpty()
  @IsBoolean()
  readonly isPrivate: boolean

  @ApiProperty({ description: 'Is global', example: false })
  @IsNotEmpty()
  @IsBoolean()
  readonly isGlobal: boolean

  @ApiProperty({ description: 'Side url', example: 'http://localhost:2444', required: false })
  @IsOptional()
  @IsUrl()
  readonly sideUrl?: string
}
