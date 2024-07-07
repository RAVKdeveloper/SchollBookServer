import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Student } from 'src/core/accounts/accounts/entities/student.entity'
import { DaySchedule } from 'src/core/class-schedule/entities/day-schedule.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { School } from 'src/core/school/entities/school.entity'

@Entity('point')
export class Point extends BasicEntity {
  @ApiProperty({ example: 5, description: 'Point' })
  @Column()
  point: string

  @ApiProperty({ example: 'Отличные знания', nullable: true })
  @Column()
  description: string

  @ApiProperty({ description: 'Student', type: () => Student })
  @ManyToOne(() => Student, student => student.points, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student' })
  student: Student

  @ApiProperty({ type: () => Lesson, description: 'Lesson' })
  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson' })
  lesson: Lesson

  @ApiProperty({ type: () => School, description: 'School' })
  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  school: School

  @ApiProperty({ description: 'Class', type: () => Class })
  @ManyToOne(() => Class, classe => classe.points, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class' })
  classe: Class

  @ApiProperty({ description: 'Day', type: () => DaySchedule })
  @ManyToOne(() => DaySchedule, day => day.points, { onDelete: 'CASCADE' })
  day: DaySchedule
}
