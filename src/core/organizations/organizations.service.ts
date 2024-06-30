import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, In, MoreThan, Repository } from 'typeorm'

import { User } from 'src/core/user/entities/user.entity'
import { Organization } from './entities/organization.entity'

import { CreateOrganizationDto } from './dto/create-organization.dto'
import { FindAllOrganizationsDto } from './dto/find-all-organizations.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'

@Injectable()
export class OrganizationsService {
  constructor(@InjectRepository(Organization) private organizationRepo: Repository<Organization>) {}

  public async create(dto: CreateOrganizationDto, userId: number) {
    try {
      const newOrganization = await this.organizationRepo.manager.transaction(
        async entityManager => {
          const participantsArray: User[] = []
          const participantsCount = { value: 0 }

          if (dto.participants && dto.participants.length > 0) {
            const participants = await entityManager.find(User, {
              where: {
                id: In(dto.participants),
              },
            })

            if (participants.length === 0) throw new NotFoundException('Участники не найдены')

            participantsCount.value = participants.length

            participantsArray.push(...participants)
          }

          return await entityManager.save(Organization, {
            ...dto,
            school: dto.schoolId ? { id: dto.schoolId } : null,
            participants: participantsArray,
            participantsCount: participantsCount.value,
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
      whereObj.school = null
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
