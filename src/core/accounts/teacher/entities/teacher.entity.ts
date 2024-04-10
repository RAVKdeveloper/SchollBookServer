import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { User } from 'src/core/user/entities/user.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('teacher_account')
export class Teacher extends BasicEntity {
  @ApiProperty({ example: false, description: 'Is admit user' })
  @Column({ name: 'is_admit' })
  isAdmit: boolean

  @ApiProperty({ example: 'Nadeshda Kolimenko', description: 'Lead class' })
  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ApiProperty({ example: '7:30 - 17:00', description: 'Opening times' })
  @Column({ name: 'opening_times' })
  OpeningTimes: string
}
