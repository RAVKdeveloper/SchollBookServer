import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Organization } from './entities/organization.entity'
import { Subscription } from './entities/subsription.entity'

import { OrganizationsController } from './organizations.controller'
import { OrganizationsService } from './organizations.service'

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Subscription])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
