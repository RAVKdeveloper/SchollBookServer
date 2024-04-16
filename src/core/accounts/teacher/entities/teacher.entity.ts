import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('teacher_account')
export class Teacher extends BasicEntity {
  @ApiProperty({ example: false, description: 'Is admit user' })
  @Column({ name: 'is_admit', default: false })
  isAdmit: boolean

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @ApiProperty({ example: 'Nadeshda Kolimenko', description: 'Lead class', enum: () => User })
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ManyToOne(() => School, school => school.teachers)
  @ApiProperty({ example: '62', description: 'School id', enum: () => School })
  @JoinColumn({ name: 'school_id' })
  school: School

  @OneToMany(() => Lesson, lesson => lesson.teacher)
  @ApiProperty({ default: [], enum: () => Lesson, description: 'Teacher lessons' })
  @JoinColumn()
  lessons: Lesson[]

  @ApiProperty()
  @ApiProperty({ example: '7:30 - 17:00', description: 'Opening times' })
  @Column({ name: 'opening_times' })
  OpeningTimes: string
}
