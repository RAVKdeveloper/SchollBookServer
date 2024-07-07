import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, In, IsNull, MoreThan, Not, Repository } from 'typeorm'

import { TypesSubsription } from 'src/basic/subscription.type'

import { Organization } from './entities/organization.entity'
import { Subscription } from './entities/subsription.entity'

import { ActionsSubscriptionDto } from './dto/actio-subscription.dto'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { FindAllOrganizationsDto } from './dto/find-all-organizations.dto'
import { QueryAllOrganizationsDto } from './dto/query-organizations.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationRepo: Repository<Organization>,
    @InjectRepository(Subscription) private subscriptionRepo: Repository<Subscription>,
  ) {}

  public async create(dto: CreateOrganizationDto, userId: number) {
    try {
      const newOrganization = await this.organizationRepo.manager.transaction(
        async entityManager => {
          return await entityManager.save(Organization, {
            ...dto,
            school: dto.schoolId ? { id: dto.schoolId } : null,
            creator: { id: userId },
          })
        },
      )

      return newOrganization
    } catch (e) {
      throw e
    }
  }

  public async findAll(dto: FindAllOrganizationsDto, userId: number) {
    const { whereObj, page, take } = this.getWhereObjByFilters(dto, userId)

    const organizations = await this.organizationRepo.find({
      relations: {
        creator: true,
        school: true,
      },
      where: {
        ...whereObj,
      },
      skip: page,
      take,
      order: {
        participantsCount: 'DESC',
        id: 'DESC',
      },
    })

    const count = await this.organizationRepo.countBy({
      ...whereObj,
    })

    return { count, data: organizations }
  }

  public async findOne(id: number) {
    const organization = await this.organizationRepo.findOne({
      relations: {
        creator: true,
        school: true,
      },
      where: {
        id,
      },
    })

    if (!organization) throw new NotFoundException('Организация не найдена')

    return organization
  }

  public async update(dto: UpdateOrganizationDto, userId: number) {
    const updateObj = await this.getUpdateObj(dto, userId)

    await this.organizationRepo.update(
      {
        id: dto.organizationId,
        creator: { id: userId },
      },
      updateObj,
    )

    return { message: 'Ok' }
  }

  public async remove(id: number, userId: number) {
    const isNotEmptyOrganization = await this.organizationRepo.findOne({
      where: {
        id,
        creator: { id: userId },
      },
    })

    if (!isNotEmptyOrganization) throw new NotFoundException('Организация не найдена')

    await this.organizationRepo.softDelete({
      id: isNotEmptyOrganization.id,
    })

    return { message: 'Ok' }
  }

  public async removeHard(id: number, userId: number) {
    const isNotEmptyOrganization = await this.organizationRepo.findOne({
      where: {
        id,
        creator: { id: userId },
      },
    })

    if (!isNotEmptyOrganization) throw new NotFoundException('Организация не найдена')

    await this.organizationRepo.delete({
      id: isNotEmptyOrganization.id,
    })

    return { message: 'Ok' }
  }

  public async recover(id: number, userId: number) {
    const organization = await this.organizationRepo.findOne({
      where: {
        id,
        creator: { id: userId },
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    })

    if (!organization) throw new NotFoundException('Организация не найдена')

    await this.organizationRepo.update(
      {
        id: organization.id,
      },
      { deletedAt: null },
    )

    return { message: 'Ok' }
  }

  public async getMyOrganizations(userId: number, dto: QueryAllOrganizationsDto) {
    const take = dto.limit ? +dto.limit : 10
    const skip = (+dto.page - 1) * take

    const organizations = await this.organizationRepo.find({
      relations: {
        creator: true,
        school: true,
      },
      where: [{ participants: { id: userId } }, { creator: { id: userId } }],
      order: {
        participantsCount: 'DESC',
        id: 'DESC',
      },
      take,
      skip,
    })

    const count = await this.organizationRepo.countBy([
      { participants: { id: userId } },
      { creator: { id: userId } },
    ])

    return { count, data: organizations }
  }

  public async actionSubscription(dto: ActionsSubscriptionDto, userId: number) {
    try {
      await this.organizationRepo.manager.transaction(async entityManager => {
        const organization = await entityManager.findOne(Organization, {
          where: {
            id: dto.organizationId,
          },
        })

        if (!organization) throw new NotFoundException('Организация не найдена')

        if (dto.type === TypesSubsription.SUB) {
          await entityManager.save(Subscription, {
            user: { id: userId },
            organization: { id: dto.organizationId },
            organizationId: dto.organizationId,
          })

          await entityManager.update(
            Organization,
            { id: organization.id },
            {
              participantsCount: organization.participantsCount + 1,
            },
          )
        } else if (dto.type === TypesSubsription.UNSUB) {
          await entityManager.delete(Subscription, {
            user: { id: userId },
            organization: { id: dto.organizationId },
            organizationId: dto.organizationId,
          })

          await entityManager.update(
            Organization,
            { id: organization.id },
            {
              participantsCount: organization.participantsCount - 1,
            },
          )
        }
      })

      return { message: 'Ok' }
    } catch (e) {
      throw e
    }
  }

  public async getAllParticipantsByOrganizationId(id: number, dto: QueryAllOrganizationsDto) {
    const take = +dto.limit ?? 10
    const skip = (+dto.page - 1) * take

    const subscriptions = await this.subscriptionRepo.find({
      relations: {
        user: true,
      },
      where: {
        organization: { id: id },
      },
      order: {
        id: 'DESC',
      },
      take,
      skip,
    })

    const count = await this.subscriptionRepo.countBy({
      organization: { id: id },
    })

    return { count, data: subscriptions }
  }

  private getWhereObjByFilters(dto: FindAllOrganizationsDto, userId: number) {
    const take = dto.limit ?? 10
    const page = take * (dto.page - 1)

    const whereObj: Record<string, unknown> = {
      school: { id: dto.schoolId },
    }

    if (dto.searchValue) {
      const searchValue = dto.searchValue
      const notNanSearch = Number(searchValue.substring(1))

      if (searchValue[0] === '#' && !isNaN(notNanSearch)) {
        whereObj.id = notNanSearch
      } else {
        whereObj.name = ILike(`%${searchValue}%`)
      }
    }

    if (dto.tags) {
      whereObj.tags = In(dto.tags.map(item => [item]))
    }

    if (dto.onlyMy) {
      whereObj.creator = { id: userId }
    }

    if (dto.isGlobal) {
      delete whereObj.school
      whereObj.isGlobal = dto.isGlobal
    }

    if (dto.isPrivate) {
      whereObj.isPrivate = dto.isPrivate
    }

    if (dto.isPopular) {
      whereObj.participantsCount = MoreThan(10)
    }

    return { page, take, whereObj }
  }

  private async getUpdateObj(dto: UpdateOrganizationDto, userId: number) {
    const organization = await this.organizationRepo.findOne({
      relations: {
        creator: true,
        participants: true,
      },
      where: {
        id: dto.organizationId,
        creator: { id: userId },
      },
    })
    const updateObj: Record<string, unknown> = {}

    if (!organization) throw new NotFoundException('Организация не найдена')

    if (dto.deletedParticipantsId && dto.deletedParticipantsId.length > 0) {
      const updatedParticipantsArr = organization.participants.filter(
        ({ id }) => !dto.deletedParticipantsId.includes(id),
      )

      ;(updateObj.participants = updatedParticipantsArr),
        (updateObj.participantsCount = updatedParticipantsArr.length)
    }

    if (dto.description) {
      updateObj.description = dto.description
    }

    if (dto.name) {
      if (dto.name === organization.name) {
        throw new ForbiddenException('Обновляемое имя такое же, как и предыдущее')
      }

      updateObj.name = dto.name
    }

    if (dto.tagsAdd) {
      updateObj.tags = [...organization.tags, ...dto.tagsAdd]
    }

    if (dto.tagsRemove) {
      const updatedTags = organization.tags.filter(tag => !dto.tagsRemove.includes(tag))
      updateObj.tags = updatedTags
    }

    if (dto.isGlobal !== undefined) {
      updateObj.isGlobal = dto.isGlobal
    }

    if (dto.isPrivate !== undefined) {
      updateObj.isPrivate = dto.isPrivate
    }

    return updateObj
  }
}
