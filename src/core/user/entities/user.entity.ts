import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'

@Entity('user')
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
  @Column({ nullable: false, default: 'https://schoolbook.com/default/avatar' })
  avatar: string

  @ApiProperty({ example: false, description: 'Is active user account' })
  @Column({ default: true })
  isActivated: boolean

  @ApiProperty({ example: false, description: 'Is blocked user account' })
  @Column({ default: false })
  blocked: boolean

  @ApiProperty({
    example: 'Вы заюлокированы за оскорбление директора школы',
    description: 'Blocked status',
  })
  @Column({ default: '' })
  blockedDescription: string
}
