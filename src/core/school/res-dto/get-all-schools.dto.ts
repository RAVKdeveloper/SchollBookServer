import { ApiProperty } from '@nestjs/swagger'

import { School } from '../entities/school.entity'

export class ResponseGetAllSchoolsDto {
  @ApiProperty({ description: 'Count', example: 22 })
  readonly count: number

  @ApiProperty({ description: 'Schools', type: School, isArray: true })
  readonly data: School[]
}
