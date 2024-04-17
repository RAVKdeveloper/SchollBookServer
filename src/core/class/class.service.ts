import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Class } from './entities/class.entity'

import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Injectable()
export class ClassService {
  constructor(@InjectRepository(Class) private classRepo: Repository<Class>) {}

  create(createClassDto: CreateClassDto) {
    return createClassDto
  }

  findAll() {
    return 'This action returns all class'
  }

  findOne(id: number) {
    return `This action returns a #${id} class`
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} ${updateClassDto} class`
  }

  remove(id: number) {
    return `This action removes a #${id} class`
  }
}
