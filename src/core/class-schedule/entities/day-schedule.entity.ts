import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Student } from 'src/core/accounts/accounts/entities/student.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { HomeWork } from 'src/core/home-work/entities/home-work.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { ClassSchedule } from './class-schedule.entity'

@Entity('day_schedule')
export class DaySchedule extends BasicEntity {
  @ManyToMany(() => Teacher)
  @ApiProperty({ isArray: true, description: 'Active teachers this day', type: () => Teacher })
  @JoinTable({ name: 'active_teachers' })
  activeTeachers: Teacher[]

  @ManyToMany(() => Student)
  @ApiProperty({ isArray: true, description: 'Empty this day students', type: () => Student })
  @JoinTable({ name: 'empty_students' })
  emptyStudents: Student[]

  @ManyToMany(() => Lesson)
  @ApiProperty({ isArray: true, description: 'This lesson in the day', type: () => Lesson })
  @JoinTable({ name: 'lessons_this_day' })
  lessons: Lesson[]

  @OneToMany(() => Point, point => point.day)
  @ApiProperty({ isArray: true, description: 'This points in the day', type: () => Point })
  @JoinColumn({ name: 'points_this_day' })
  points: Point[]

  @ApiProperty({ type: () => ClassSchedule })
  @ManyToOne(() => ClassSchedule, schedule => schedule.days, { onDelete: 'CASCADE' })
  schedule: ClassSchedule

  @ApiProperty({ description: 'Home works', type: () => HomeWork, isArray: true })
  @OneToMany(() => HomeWork, homeWork => homeWork.daySchedule, { onDelete: 'CASCADE' })
  homeWorks: HomeWork[]

  @ApiProperty({ example: 'Среда', description: 'Day week name' })
  @Column({ name: 'day_name' })
  dayName: string

  @ApiProperty({ example: '8:00-8:45' })
  @Column({ nullable: true })
  time: string

  @ApiProperty({ example: '2022/03/03', description: 'Date' })
  @Column({ nullable: true, type: 'date' })
  date: string
}
