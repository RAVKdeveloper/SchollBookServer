import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class FindAllSchoolsDto {
  @ApiProperty({ description: 'Search value', example: 'МБОУ СЩ ...', required: false })
  @IsOptional()
  @IsString()
  readonly searchValue?: string

  @ApiProperty({ description: 'Page', example: '1' })
  @IsNotEmpty()
  readonly page: string

  @ApiProperty({ description: 'Limit', example: '10', required: false })
  @IsOptional()
  readonly limit?: string
}
