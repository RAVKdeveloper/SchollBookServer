import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'

@Entity('teacher_account')
export class Teacher extends BasicEntity {
  @ApiProperty({ example: false, description: 'Is admit user' })
  @Column({ name: 'is_admit', default: false })
  isAdmit: boolean

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Lead class', type: () => User })
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ManyToOne(() => School, school => school.teachers)
  @ApiProperty({ description: 'School id', type: () => School })
  @JoinColumn({ name: 'school_id' })
  school: School

  @ManyToMany(() => Lesson, lesson => lesson.teacher, { cascade: true })
  @ApiProperty({ isArray: true, type: () => Lesson, description: 'Teacher lessons' })
  lessons: Lesson[]

  @ApiProperty()
  @ApiProperty({ example: '7:30 - 17:00', description: 'Opening times' })
  @Column({ name: 'opening_times' })
  OpeningTimes: string

  @ApiProperty({ description: 'Chief to class', type: () => Class, isArray: true })
  @ManyToMany(() => Class, classe => classe.chiefs, { nullable: true })
  class: Class[]
}
