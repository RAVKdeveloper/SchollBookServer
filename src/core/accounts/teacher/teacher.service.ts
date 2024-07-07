import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Teacher } from './entities/teacher.entity'

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private teacherRepo: Repository<Teacher>) {}

  findAll() {
    return this.teacherRepo.find()
  }

  findAllThisSchool(schoolId: number) {
    return this.teacherRepo.find({
      where: { school: { id: schoolId } },
      relations: {
        lessons: true,
        userId: true,
      },
    })
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo.findOne({
      where: { id },
      relations: { lessons: true, userId: true },
    })

    if (!teacher) throw new NotFoundException('Учитель не найден')

    return teacher
  }
}
