import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Owner } from './entities/owner.entity'

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownerRepo: Repository<Owner>) {}

  async create(userId: number) {
    const isEmpty = await this.ownerRepo.findOne({
      where: { userId: { id: userId } },
    })

    if (isEmpty) throw new ForbiddenException('Такой пользователь уже существует')

    return await this.ownerRepo.save({ userId: { id: userId } })
  }

  async remove(id: number) {
    return await this.ownerRepo.delete({ id })
  }
}
