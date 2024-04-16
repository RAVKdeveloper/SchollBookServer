import { Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'
import { User } from 'src/core/user/entities/user.entity'
import { School } from 'src/core/school/entities/school.entity'

@Entity('owner_account')
export class Owner extends BasicEntity {
  @ManyToOne(() => User)
  @ApiProperty({ default: [() => User], description: 'Reference to user id', enum: () => User })
  @JoinColumn({ name: 'user_id' })
  userId: User

  @OneToOne(() => School, school => school.owner, { nullable: true })
  @ApiProperty({ default: [], description: 'School id', enum: () => School })
  @JoinColumn({ name: 'school_id' })
  school: School
}
