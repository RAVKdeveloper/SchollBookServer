import { ApiProperty } from '@nestjs/swagger'

import { Subscription } from '../entities/subsription.entity'

export class ResponseAllParticipantsDto {
  @ApiProperty({ description: 'Count', example: 22 })
  readonly count: number

  @ApiProperty({ description: 'Participants', type: Subscription, isArray: true })
  readonly data: Subscription[]
}
