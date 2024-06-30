import { ApiProperty } from '@nestjs/swagger'

import { Organization } from '../entities/organization.entity'

export class ResponseGetAllOrganizationsDto {
  @ApiProperty({ description: 'Count', example: 2 })
  readonly count: number

  @ApiProperty({ description: 'Organizations array', type: Organization, isArray: true })
  readonly data: Organization[]
}
