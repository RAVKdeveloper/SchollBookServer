import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Teacher } from './entities/teacher.entity'
import { CreateTeacherDto } from './dto/create-teacher.dto'
import { UpdateTeacherDto } from './dto/update-teacher.dto'

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private teacherRepo: Repository<Teacher>) {}

  async create(dto: CreateTeacherDto, userId: number) {
    const teacher = await this.teacherRepo.save({
      ...dto,
      school: { id: dto.school },
      userId: { id: userId },
    })

    return teacher
  }

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

  update(id: number, dto: UpdateTeacherDto) {
    return this.teacherRepo.update({ id }, { OpeningTimes: dto.OpeningTimes })
  }

  remove(id: number) {
    return this.teacherRepo.delete({ id })
  }
}
