import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { User } from 'src/core/user/entities/user.entity'

@Entity('auth_code')
export class AuthCode extends BasicEntity {
  @ApiProperty({ example: '1111', description: 'Email verification code' })
  @Column({ nullable: false })
  code: string

  @ApiProperty({ example: '1', description: 'User id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User
}
