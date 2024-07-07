import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Student } from 'src/core/accounts/accounts/entities/student.entity'
import { Owner } from 'src/core/accounts/owner/owner.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'

@Entity('school')
export class School extends BasicEntity {
  @ApiProperty({ example: 'МБОУ "СШ 62"', description: 'School name' })
  @Column()
  name: string

  @ApiProperty({
    example: 'https://schoolbook/schoolAvatars?school=62',
    description: 'School name',
  })
  @Column({ nullable: true })
  avatarUrl: string

  @ApiProperty({ example: 'st.Ukrainian h.65', description: 'School location' })
  @Column()
  location: string

  @ApiProperty({ example: '353535325355', description: 'License registration number' })
  @Column({ name: 'license_reg_number', unique: true })
  licenseNumber: string

  @ApiProperty({ example: 'https://schoolbook.ru/license?school=1', description: 'License image' })
  @Column({ name: 'license_img', nullable: true })
  licenseImg: string

  @OneToOne(() => Owner, owner => owner.school)
  @ApiProperty({ description: 'Owner id', type: () => Owner })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner

  @ApiProperty({ example: '5', description: 'Points system in school' })
  @Column({ name: 'points_system' })
  pointsSystem: string

  @ApiProperty({ example: '22.344.43', description: 'School IP address' })
  @Column({ name: 'ip' })
  ip: string

  @ApiProperty({ isArray: true, description: 'Students id', type: () => Student })
  @OneToMany(() => Student, student => student.school, { onDelete: 'CASCADE' })
  students: Student[]

  @ApiProperty({ isArray: true, description: 'Teachers id', type: () => Teacher })
  @OneToMany(() => Teacher, teacher => teacher.school, { onDelete: 'CASCADE' })
  teachers: Teacher[]

  @ApiProperty({ type: () => Lesson, isArray: true })
  @OneToMany(() => Lesson, lesson => lesson.school)
  @JoinColumn()
  lessons: Lesson[]

  @ApiProperty({ isArray: true, type: () => Class })
  @OneToMany(() => Class, classe => classe.school)
  @JoinColumn()
  classes: Class[]

  @ApiProperty({ example: 'Moscow', description: 'Region from this school' })
  @Column()
  region: string

  @ApiProperty({ example: true, description: 'Is activated school' })
  @Column({ name: 'is_activated', default: false })
  IsActivated: boolean

  @ApiProperty({ example: false, description: 'Is blocked school' })
  @Column({ default: false })
  blocked: boolean
}
