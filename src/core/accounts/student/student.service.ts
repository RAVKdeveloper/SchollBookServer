import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Student } from './entities/student.entity'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Injectable()
export class StudentService {
  cacheKey: string = '/api/student'

  constructor(@InjectRepository(Student) private studentRepo: Repository<Student>) {}

  async create(dto: CreateStudentDto, userId: number) {
    return await this.studentRepo.save({
      school: { id: dto.schoolId },
      userId: { id: userId },
    })
  }

  async findAll(schoolId: number) {
    return await this.studentRepo.find({
      where: { school: { id: schoolId } },
      relations: {
        userId: true,
      },
    })
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: {
        userId: true,
        class: {
          chiefs: {
            userId: true,
          },
          lessons: true,
        },
        school: true,
      },
    })

    if (!student) throw new NotFoundException('Пользователь не найден')

    return student
  }

  update(id: number, dto: UpdateStudentDto) {
    return this.studentRepo.update({ id }, { isAdmit: dto.isAdmit })
  }

  remove(id: number, userId: number) {
    return this.studentRepo.delete({ id, userId: { id: userId } })
  }
}
