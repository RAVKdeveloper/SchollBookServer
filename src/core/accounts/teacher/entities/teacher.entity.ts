import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('teacher_account')
export class Teacher extends BasicEntity {
  @ApiProperty({ example: false, description: 'Is admit user' })
  @Column({ name: 'is_admit' })
  isAdmit: boolean

  @ApiProperty({ example: 'Nadeshda Kolimenko', description: 'Lead class' })
  @OneToOne(() => User, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ApiProperty({ example: '62', description: 'School id' })
  @ManyToOne(() => School, school => school.teachers)
  @JoinColumn({ name: 'school_id' })
  school: School

  @ApiProperty({ example: '7:30 - 17:00', description: 'Opening times' })
  @Column({ name: 'opening_times' })
  OpeningTimes: string
}
