import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

import { TypesSubsription } from 'src/basic/subscription.type'

export class ActionsSubscriptionDto {
  @ApiProperty({ description: 'Organization id', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  readonly organizationId: number

  @ApiProperty({ description: 'Type subscription', example: TypesSubsription.SUB })
  @IsNotEmpty()
  @IsEnum(TypesSubsription)
  readonly type: TypesSubsription
}
