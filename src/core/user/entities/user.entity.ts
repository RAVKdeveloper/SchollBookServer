import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'

import type { Roles } from 'src/basic/roles.type'

Entity('user')
export class User extends BasicEntity {
  @ApiProperty({ example: 'Bill', description: 'User name' })
  @Column({ nullable: false })
  name: string

  @ApiProperty({ example: 'Kirillovich', description: 'User middlename' })
  @Column({ nullable: false })
  middlename: string

  @ApiProperty({ example: 'Butcher', description: 'User surname' })
  @Column({ nullable: false })
  surname: string

  @ApiProperty({ example: 'schoolbook@example.com', description: 'User Email' })
  @Column({ nullable: false, unique: true })
  email: string

  @ApiProperty({ description: 'User password' })
  @Column()
  password: string

  @ApiProperty({ example: 'https://schoolbook.com/default/avatar', description: 'User avatar' })
  @Column({ nullable: false })
  avatar: string

  @ApiProperty({
    example: 'OWNER',
    description: 'User Role("OWNER" or "STUDENT" or "TEACHER" or "PARENT")',
  })
  @Column({ nullable: false })
  role: Roles

  @ApiProperty({ example: false, description: 'Is active user account' })
  @Column({ default: false })
  isActivated: boolean

  @ApiProperty({ example: false, description: 'Is blocked user account' })
  @Column({ default: false })
  blocked: boolean

  @ApiProperty({
    example: 'Вы заюлокированы за оскорбление директора школы',
    description: 'Blocked status',
  })
  @Column({ default: '' })
  blockedDescription: boolean
}
