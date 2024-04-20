import { Entity, Column, JoinColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { School } from 'src/core/school/entities/school.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Point } from 'src/core/point-system/entities/point-system.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('student_account')
export class Student extends BasicEntity {
  @ApiProperty({ example: '1', description: 'Reference to user id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ApiProperty({ example: true, description: 'Is admit student for school' })
  @Column({ default: false, nullable: false })
  isAdmit: boolean

  @ApiProperty({ example: '62', description: 'School id', enum: () => School })
  @ManyToOne(() => School, school => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School

  @ManyToMany(() => Class, classe => classe.students)
  @ApiProperty({ default: [], description: 'Class student', enum: () => Class })
  @JoinColumn({ name: 'class' })
  class: Class[]

  @OneToMany(() => Point, point => point.student)
  @ApiProperty({ description: 'Points student', enum: () => Point })
  points: Point[]

  @ApiProperty({
    example: '2024-03-02T11:18:30.993Z',
    description: 'Date of accession user in school',
  })
  @Column({ nullable: true, name: 'date_of_accession' })
  dateOfAccession: Date
}
