import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'

@Entity('organizations')
export class Organization extends BasicEntity {
  @ApiProperty({ description: 'Name', example: 'My school top!!!' })
  @Column({ unique: true })
  readonly name: string

  @ApiProperty({ description: 'School', enum: () => School })
  @ManyToOne(() => School, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'school' })
  readonly school: School | null

  @ApiProperty({ description: 'Participants', enum: () => User, isArray: true })
  @ManyToMany(() => User)
  @JoinTable({ name: 'participants_in_organization' })
  readonly participants: User[]

  @ApiProperty({ description: 'Is blocked', example: false })
  @Column({ default: false })
  readonly isBlocked: boolean

  @ApiProperty({ description: 'Description', example: 'Description organization' })
  @Column()
  readonly description: string

  @ApiProperty({ description: 'Tags', example: ['School if 56'], isArray: true })
  @Column({ type: 'text', array: true })
  readonly tags: string[]

  @ApiProperty({ description: 'Is private', example: false })
  @Column({ name: 'is_private' })
  readonly isPrivate: boolean

  @ApiProperty({ description: 'Organization avatar', example: 'https://schoolbook/avatar' })
  @Column({
    default: '23j2ioijorew',
    name: 'organization_avatar',
  })
  readonly avatar: string

  @ApiProperty({ description: 'Creator', enum: () => User })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creator' })
  readonly creator: User

  @ApiProperty({ description: 'Is global', example: false })
  @Column({ name: 'is_global' })
  readonly isGlobal: boolean

  @ApiProperty({ description: 'Participants count', example: 100 })
  @Column({ name: 'participants_count', default: 0 })
  readonly participantsCount: number

  @ApiProperty({ description: 'Is verify', example: false })
  @Column({ default: false, name: 'is_verify' })
  readonly isVerify: boolean

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt: Date
}
