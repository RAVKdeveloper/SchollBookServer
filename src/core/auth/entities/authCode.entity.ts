import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { User } from 'src/core/user/entities/user.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('auth_code')
export class AuthCode extends BasicEntity {
  @ApiProperty({ example: '1111', description: 'Email verification code' })
  @Column({ nullable: false })
  code: number

  @ApiProperty({ example: '1', description: 'User id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User
}
