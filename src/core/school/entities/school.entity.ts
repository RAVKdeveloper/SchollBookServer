import { Entity, OneToOne, Column, JoinColumn, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Student } from 'src/core/accounts/student/entities/student.entity'
import { Owner } from 'src/core/accounts/owner/entities/owner.entity'
import { BasicEntity } from 'src/basic/basic.entity'

@Entity('school')
export class School extends BasicEntity {
  @ApiProperty({ example: 'МБОУ "СШ 62"', description: 'School name' })
  @Column()
  name: string

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
  @ApiProperty({ example: '1', description: 'Owner id', enum: () => Owner })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner

  @ApiProperty({ example: '5', description: 'Points system in school' })
  @Column({ name: 'points_system' })
  pointsSystem: string

  @ApiProperty({ example: '22.344.43', description: 'School IP address' })
  @Column({ name: 'ip' })
  ip: string

  @OneToMany(() => Student, student => student.school, { onDelete: 'CASCADE' })
  @ApiProperty({ default: [], description: 'Students id', enum: () => Student })
  students: Student[]

  @OneToMany(() => Teacher, teacher => teacher.school, { onDelete: 'CASCADE' })
  @ApiProperty({ default: [], description: 'Teachers id', enum: () => Teacher })
  teachers: Teacher[]

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
