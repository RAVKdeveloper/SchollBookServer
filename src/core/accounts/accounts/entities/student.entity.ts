import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Parent } from './parent.entity'

@Entity('student_account')
export class Student extends BasicEntity {
  @ApiProperty({ description: 'Reference to user id', type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ApiProperty({ example: true, description: 'Is admit student for school' })
  @Column({ default: false, nullable: false })
  isAdmit: boolean

  @ApiProperty({ description: 'School id', type: () => School })
  @ManyToOne(() => School, school => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School

  @ManyToMany(() => Class, classe => classe.students)
  @ApiProperty({ description: 'Class student', type: () => Class, isArray: true })
  @JoinColumn({ name: 'class' })
  class: Class[]

  @ApiProperty({ description: 'Points student', type: () => Point, isArray: true })
  @OneToMany(() => Point, point => point.student)
  points: Point[]

  @ApiProperty({
    example: '2024-03-02T11:18:30.993Z',
    description: 'Date of accession user in school',
  })
  @Column({ nullable: true, name: 'date_of_accession' })
  dateOfAccession: Date

  @ApiProperty({ description: 'Parents', type: () => Parent })
  @ManyToOne(() => Parent, parent => parent.childrens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parents' })
  readonly parents: Parent
}
