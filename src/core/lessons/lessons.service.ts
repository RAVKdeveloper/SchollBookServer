import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Lesson } from './entities/lesson.entity'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { AddTeacherToLessonDto } from './dto/add-teacher.dto'

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private lessonRepo: Repository<Lesson>) {}

  async create(dto: CreateLessonDto) {
    return await this.lessonRepo.save({ ...dto, school: { id: dto.school } })
  }

  findAll(id: number) {
    return this.lessonRepo.find({ where: { school: { id } }, relations: { teacher: true } })
  }

  findOne(id: number) {
    return this.lessonRepo.find({
      where: { id },
      relations: { teacher: true },
    })
  }

  async update(id: number, dto: UpdateLessonDto) {
    if (dto.lessonName) return await this.lessonRepo.update({ id }, { lessonName: dto.lessonName })
    throw new BadRequestException()
  }

  remove(id: number) {
    return this.lessonRepo.delete({ id })
  }

  async addTeacher({ lessonId, teacherId }: AddTeacherToLessonDto) {
    const newLesson = this.lessonRepo.update({ id: lessonId }, { teacher: { id: teacherId } })

    return newLesson
  }
}
