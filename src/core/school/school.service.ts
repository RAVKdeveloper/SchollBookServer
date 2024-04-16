import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Owner } from '../accounts/owner/entities/owner.entity'
import { School } from './entities/school.entity'
import { CreateSchoolDto } from './dto/create-school.dto'

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private schoolRepo: Repository<School>,
    @InjectRepository(Owner) private ownerRepo: Repository<Owner>,
  ) {}

  async create(dto: CreateSchoolDto, userId: number) {
    const owner = await this.ownerRepo.findOne({ where: { userId: { id: userId }, school: null } })

    if (!owner) throw new NotFoundException('Пользователь не найден')

    const isEmpty = await this.schoolRepo.findOne({ where: { licenseNumber: dto.licenseNumber } })

    if (isEmpty) throw new ForbiddenException('Такая школа уже существует')

    const newSchool = await this.schoolRepo.save({ ...dto, ip: '132.3535.345', owner: owner })

    return newSchool
  }

  async findAll() {
    return await this.schoolRepo.find({
      relations: { owner: true, teachers: true, students: true },
    })
  }

  async findOne(id: number) {
    return await this.schoolRepo.findOne({
      where: { id },
      relations: { owner: true, teachers: true },
    })
  }

  async remove(id: number, userId: number) {
    const owner = await this.ownerRepo.findOne({ where: { userId: { id: userId } } })

    if (!owner) throw new NotFoundException('Пользователь не найден')

    return this.schoolRepo.delete({ id, owner })
  }
}
