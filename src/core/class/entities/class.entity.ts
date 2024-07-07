import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Parent } from 'src/core/accounts/accounts/entities/parent.entity'
import { Student } from 'src/core/accounts/accounts/entities/student.entity'
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

  @ApiProperty({ description: 'School', type: () => School })
  @ManyToOne(() => School, school => school.classes)
  @Index('school_id')
  @JoinColumn({ name: 'school' })
  school: School

  @ApiProperty({ type: () => Teacher, isArray: true, description: 'Chief this class' })
  @ManyToMany(() => Teacher, teacher => teacher.class, { nullable: true })
  @JoinTable({ name: 'chief_teachers' })
  chiefs: Teacher[]

  @ApiProperty({
    type: () => Lesson,
    isArray: true,
    description: 'Lessons this class',
  })
  @OneToMany(() => Lesson, lesson => lesson.classes, { nullable: true })
  @JoinColumn({ name: 'lessons' })
  lessons: Lesson[]

  @ApiProperty({ description: 'Students for class', type: () => Student, isArray: true })
  @ManyToMany(() => Student, student => student.class, { nullable: true })
  @JoinTable({ name: 'students_table' })
  students: Student[]

  @ApiProperty({ description: 'Points', type: () => Point, isArray: true })
  @OneToMany(() => Point, point => point.classe)
  points: Point[]

  @ApiProperty({ description: 'Schedule', type: () => ClassSchedule, isArray: true })
  @OneToMany(() => ClassSchedule, schedule => schedule.class)
  @JoinColumn()
  schedule: ClassSchedule[]

  @ApiProperty({ description: 'Home works', type: () => HomeWork, isArray: true })
  @OneToMany(() => HomeWork, homeWork => homeWork.classe, { cascade: true })
  homeWorks: HomeWork[]

  @ApiProperty({ description: 'Parents', type: () => Parent, isArray: true })
  @ManyToMany(() => Parent, parent => parent.classes)
  readonly parents: Parent[]
}
