import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Lesson } from './entities/lesson.entity'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { AddTeacherToLessonDto } from './dto/add-teacher.dto'
import { RemoveTeacherInTheLessonDto } from './dto/remove-teacher.dto'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) {}

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
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: { teacher: true },
    })
    const teacher = await this.teacherRepo.findOne({
      where: { id: teacherId },
      relations: { lessons: true },
    })

    if (!lesson || !teacher) throw new NotFoundException()

    const isNotEmpty = lesson.teacher.find(el => el.id === teacher.id)

    if (isNotEmpty) throw new ForbiddenException('Пользователь уже добавлен')

    lesson.teacher.push(teacher)

    return this.lessonRepo.save(lesson)
  }

  async deleteTeacherForLessen({ lessonId, teacherId }: RemoveTeacherInTheLessonDto) {
    const lesson = await this.lessonRepo.findOne({
      where: { id: lessonId },
      relations: { teacher: true },
    })

    if (!lesson) throw new NotFoundException('Урок не найден')

    const newTeachers = lesson.teacher.filter(teacher => teacher.id !== teacherId)

    return this.lessonRepo.save({ ...lesson, teacher: newTeachers })
  }
}
