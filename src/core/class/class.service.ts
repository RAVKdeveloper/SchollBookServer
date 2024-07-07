import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cache } from 'cache-manager'
import { Repository } from 'typeorm'

import { Student } from '../accounts/accounts/entities/student.entity'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { MailService } from '../mail/mail.service'
import { User } from '../user/entities/user.entity'
import { Class } from './entities/class.entity'

@Injectable()
export class ClassService {
  chacheKey: string = '/api/class/'

  constructor(
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    @Inject('CACHE_MANAGER') private cahceManager: Cache,
    private mailService: MailService,
  ) {}

  // CRUD

  async findAll(id: number) {
    return await this.classRepo.find({
      where: { school: { id: id } },
      relations: {
        students: true,
        chiefs: true,
      },
    })
  }

  async findOne(id: number) {
    const clas = await this.classRepo.findOne({
      where: { id },
      relations: {
        lessons: {
          teacher: {
            userId: true,
          },
        },
        chiefs: {
          userId: true,
        },
        students: {
          userId: true,
        },
      },
      cache: true,
    })

    if (!clas) throw new NotFoundException('Класс не найден')

    const newStudents = clas.students.filter(({ isAdmit }) => isAdmit === true)

    clas.students = newStudents

    return clas
  }
}
