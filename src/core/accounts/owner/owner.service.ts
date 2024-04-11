import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Owner } from './entities/owner.entity'
// import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'

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

  findAll() {
    return 'This action returns all owner'
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} ${updateOwnerDto}`
  }

  remove(id: number) {
    return `This action removes a #${id} owner`
  }
}
