import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class QueryAllOrganizationsDto {
  @ApiProperty({ description: 'Page', example: '1' })
  @IsNotEmpty()
  readonly page: string

  @ApiProperty({ description: 'Limit', example: '10', required: false })
  @IsOptional()
  readonly limit?: string
}
