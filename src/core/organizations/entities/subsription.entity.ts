import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Organization } from './organization.entity'

@Entity('subscription')
export class Subscription extends BasicEntity {
  @ApiProperty({ description: 'Organization', type: () => Organization })
  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly organization: Organization

  @ApiProperty({ description: 'User', type: () => User })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  readonly user: User

  @ApiProperty({ description: 'Organization id', example: 1 })
  @Column({ unique: true, name: 'organization_id' })
  readonly organizationId: number
}
