import { Entity, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'
import { User } from 'src/core/user/entities/user.entity'

@Entity('owner_account')
export class Owner extends BasicEntity {
  @ApiProperty({ example: '1', description: 'Reference to user id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User
}
