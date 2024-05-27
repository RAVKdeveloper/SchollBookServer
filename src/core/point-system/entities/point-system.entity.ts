import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Student } from 'src/core/accounts/student/entities/student.entity'
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

  @ManyToOne(() => Student, student => student.points, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Student', enum: () => Student })
  @JoinColumn({ name: 'student' })
  student: Student

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => Lesson, description: 'Lesson' })
  @JoinColumn({ name: 'lesson' })
  lesson: Lesson

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => Lesson, description: 'School' })
  school: School

  @ManyToOne(() => Class, classe => classe.points, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Class', enum: () => Class })
  @JoinColumn({ name: 'class' })
  classe: Class

  @ManyToOne(() => DaySchedule, day => day.points, { onDelete: 'CASCADE' })
  @ApiProperty({ description: 'Day', enum: () => DaySchedule })
  day: DaySchedule
}
