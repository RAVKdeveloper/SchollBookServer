import { Entity, ManyToOne, ManyToMany, JoinTable, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Student } from 'src/core/accounts/student/entities/student.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { ClassSchedule } from './class-schedule.entity'

@Entity('day_schedule')
export class DaySchedule extends BasicEntity {
  @ManyToMany(() => Teacher)
  @ApiProperty({ example: [], description: 'Active teachers this day', enum: () => Teacher })
  @JoinTable({ name: 'active_teachers' })
  activeTeachers: Teacher[]

  @ManyToMany(() => Student)
  @ApiProperty({ example: [], description: 'Empty this day students', enum: () => Student })
  @JoinTable({ name: 'empty_students' })
  emptyStudents: Student[]

  @ManyToMany(() => Lesson)
  @ApiProperty({ example: [], description: 'This lesson in the day', enum: () => Lesson })
  @JoinTable({ name: 'lessons_this_day' })
  lessons: Lesson[]

  @ManyToMany(() => Point)
  @ApiProperty({ example: [], description: 'This points in the day', enum: () => Point })
  @JoinTable({ name: 'points_this_day' })
  points: Point[]

  @ManyToOne(() => ClassSchedule, schedule => schedule.days, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => ClassSchedule })
  schedule: ClassSchedule

  @ApiProperty({ example: 'Среда', description: 'Day week name' })
  @Column({ name: 'day_name' })
  dayName: string

  @ApiProperty({ example: '8:00-8:45' })
  @Column({ nullable: true })
  time: string
}
