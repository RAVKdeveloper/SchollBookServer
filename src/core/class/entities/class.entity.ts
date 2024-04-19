import { Entity, Column, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'
import { School } from 'src/core/school/entities/school.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Student } from 'src/core/accounts/student/entities/student.entity'

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

  @ManyToMany(() => Lesson, lesson => lesson.classes, { nullable: true })
  @ApiProperty({ default: [], enum: () => Lesson, description: 'Lessons this class' })
  @JoinTable({ name: 'lessons' })
  lessons: Lesson[]

  @ManyToMany(() => Student, student => student.class, { nullable: true })
  @ApiProperty({ default: [], description: 'Students for class', enum: () => Student })
  @JoinTable({ name: 'students_table' })
  students: Student[]
}
