import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Lesson } from './entities/lesson.entity'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
  ) {}

  findAll(id: number) {
    return this.lessonRepo.find({
      where: { school: { id } },
      relations: { teacher: true, classes: true },
    })
  }

  findOne(id: number) {
    return this.lessonRepo.find({
      where: { id },
      relations: { teacher: true, classes: true },
    })
  }
}
