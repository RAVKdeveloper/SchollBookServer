import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from 'src/core/user/entities/user.entity'
import { School } from 'src/core/school/entities/school.entity'
import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'
import { OwnerController } from './owner.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Owner, User, School])],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
