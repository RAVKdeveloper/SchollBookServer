import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Student } from 'src/core/accounts/student/entities/student.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { ClassSchedule } from 'src/core/class-schedule/entities/class-schedule.entity'
import { HomeWork } from 'src/core/home-work/entities/home-work.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { School } from 'src/core/school/entities/school.entity'

@Entity('class')
export class Class extends BasicEntity {
  @ApiProperty({ example: '10', description: 'Class current' })
  @Column()
  name: number

  @ApiProperty({ example: 'A', description: 'Class parallel' })
  @Column()
  parallel: string

  @ManyToOne(() => School, school => school.classes)
  @ApiProperty({ default: School, description: 'School', enum: () => School })
  @JoinColumn({ name: 'school' })
  school: School

  @ManyToMany(() => Teacher, teacher => teacher.class, { nullable: true })
  @ApiProperty({ default: [], enum: () => Teacher, description: 'Chief this class' })
  @JoinTable({ name: 'chief_teachers' })
  chiefs: Teacher[]

  @OneToMany(() => Lesson, lesson => lesson.classes, { nullable: true })
  @ApiProperty({ default: [], enum: () => Lesson, description: 'Lessons this class' })
  @JoinColumn({ name: 'lessons' })
  lessons: Lesson[]

  @ManyToMany(() => Student, student => student.class, { nullable: true })
  @ApiProperty({ default: [], description: 'Students for class', enum: () => Student })
  @JoinTable({ name: 'students_table' })
  students: Student[]

  @OneToMany(() => Point, point => point.classe)
  @ApiProperty({ description: 'Points', enum: () => Point })
  points: Point[]

  @OneToMany(() => ClassSchedule, schedule => schedule.class)
  @ApiProperty({ description: 'Schedule', enum: () => ClassSchedule })
  @JoinColumn()
  schedule: ClassSchedule[]

  @OneToMany(() => HomeWork, homeWork => homeWork.classe, { cascade: true })
  @ApiProperty({ description: 'Home works', enum: () => HomeWork, isArray: true })
  homeWorks: HomeWork[]
}
