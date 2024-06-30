import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Owner } from '../accounts/owner/owner.entity'
import { School } from './entities/school.entity'

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) private schoolRepo: Repository<School>,
    @InjectRepository(Owner) private ownerRepo: Repository<Owner>,
  ) {}

  async findAll() {
    return await this.schoolRepo.find({
      relations: { owner: true, teachers: true, students: true },
    })
  }

  async findOne(id: number) {
    return await this.schoolRepo.findOne({
      where: { id },
      relations: { owner: true, teachers: true, lessons: true },
    })
  }
}
