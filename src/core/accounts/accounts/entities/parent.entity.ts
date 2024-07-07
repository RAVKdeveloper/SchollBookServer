import { ApiProperty } from '@nestjs/swagger'
import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'
import { Student } from './student.entity'

@Entity('parent_account')
export class Parent extends BasicEntity {
  @ApiProperty({ description: 'User', type: () => User })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  readonly user: User

  @ApiProperty({ description: 'Childrens', type: () => Student, isArray: true })
  @OneToMany(() => Student, student => student.parents)
  readonly childrens: Student[]

  @ApiProperty({ description: 'Class', type: () => Class, isArray: true })
  @ManyToMany(() => Class, classe => classe.parents, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'classes' })
  readonly classes: Class[]

  @ApiProperty({ description: 'School', type: () => School })
  @OneToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'school' })
  readonly school: School
}
