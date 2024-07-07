import { ApiProperty } from '@nestjs/swagger'
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { School } from 'src/core/school/entities/school.entity'
import { User } from 'src/core/user/entities/user.entity'

@Entity('owner_account')
export class Owner extends BasicEntity {
  @ManyToOne(() => User)
  @ApiProperty({ description: 'Reference to user id', type: () => User })
  @JoinColumn({ name: 'user_id' })
  userId: User

  @OneToOne(() => School, school => school.owner, { nullable: true })
  @ApiProperty({ description: 'School id', type: () => School })
  @JoinColumn({ name: 'school_id' })
  school: School
}
