import { Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'
import { User } from 'src/core/user/entities/user.entity'
import { School } from 'src/core/school/entities/school.entity'

@Entity('owner_account')
export class Owner extends BasicEntity {
  @ApiProperty({ example: '1', description: 'Reference to user id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: User

  @ApiProperty({ example: '62', description: 'School id' })
  @OneToOne(() => School, school => school.owner, { nullable: true })
  @JoinColumn({ name: 'school_id' })
  school: School
}
