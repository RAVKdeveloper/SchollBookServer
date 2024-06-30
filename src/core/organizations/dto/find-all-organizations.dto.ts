import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class FindAllOrganizationsDto {
  @ApiProperty({ description: 'Search value', example: 'Движение первых', required: false })
  @IsOptional()
  readonly searchValue?: string

  @ApiProperty({ description: 'Sort by popular', example: true })
  @IsNotEmpty()
  @IsBoolean()
  readonly isPopular: boolean

  @ApiProperty({ description: 'Page', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly page: number

  @ApiProperty({ description: 'Limit', example: 10, required: false })
  @IsOptional()
  @IsNumber()
  readonly limit?: number

  @ApiProperty({ description: 'Tags', example: ['new tag'], isArray: true, required: false })
  @IsOptional()
  @IsArray()
  readonly tags?: string[]

  @ApiProperty({ description: 'Filter by private', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  readonly isPrivate?: boolean

  @ApiProperty({ description: 'Filter by global', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  readonly isGlobal?: boolean

  @ApiProperty({ description: 'Only my  organizations', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  readonly onlyMy?: boolean

  @ApiProperty({ description: 'School id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
