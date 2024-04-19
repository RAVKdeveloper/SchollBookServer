import { ForbiddenException, Injectable, NotFoundException, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'

import { User } from '../user/entities/user.entity'
import { MailService } from '../mail/mail.service'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Student } from '../accounts/student/entities/student.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Class } from './entities/class.entity'

import { AddChiefClassDto } from './dto/add-cheif.dto'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { RemoveChiefClassDto } from './dto/remove-cheif.dto'
import { AddStudentDto } from './dto/add-student.dto'
import { RemoveStudentDto } from './dto/remove-student.dto'
import { AddLessonToClassDto } from './dto/add-lesson.dto'

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

  async create(dto: CreateClassDto, userId: number) {
    const emptyClass = await this.classRepo.findOne({
      where: {
        school: { id: dto.school },
        name: dto.name,
        parallel: dto.parallel,
      },
    })
    const createrUser = await this.userRepo.findOne({ where: { id: userId } })

    if (!createrUser) throw new NotFoundException('Такой пользователь не существует')

    if (emptyClass) throw new ForbiddenException('Такой класс уже существует')

    const newClass = await this.classRepo.save({
      ...dto,
      school: { id: dto.school },
    })

    await this.mailService.successfulCreateClass({
      email: createrUser.email,
      school: dto.school.toString(),
      class: `${newClass.name}-${newClass.parallel}`,
      createrUsername: `${createrUser.name} ${createrUser.middlename} ${createrUser.surname}`,
    })

    return newClass
  }

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
    return await this.classRepo.findOne({
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
  }

  // Remove and add chiefs

  async addChief(dto: AddChiefClassDto) {
    const clas = await this.classRepo.findOne({
      where: { id: dto.classId },
      relations: { chiefs: true },
    })
    const teacher = await this.teacherRepo.findOne({ where: { id: dto.teacherId } })

    if (!clas) throw new NotFoundException('Класс не найден')
    if (!teacher) throw new NotFoundException('Учитель не найден')
    if (clas.chiefs.find(chief => chief.id === dto.teacherId)) {
      throw new ForbiddenException('Классный руководитель с таким id уже существует')
    }

    await clas.chiefs.push(teacher)

    const chacheKey = `${this.chacheKey}${dto.classId}`

    await this.cahceManager.del(chacheKey)

    return await this.classRepo.save(clas)
  }

  async removeChief(dto: RemoveChiefClassDto) {
    const clas = await this.classRepo.findOne({
      where: { id: dto.classId },
      relations: { chiefs: true },
    })

    if (!clas) throw new NotFoundException('Класс не найден')

    const updateChiefs = clas.chiefs.filter(chief => chief.id !== dto.teacherId)

    const chacheKey = `${this.chacheKey}${dto.classId}`

    await this.cahceManager.del(chacheKey)

    return await this.classRepo.save({ ...clas, chiefs: updateChiefs })
  }

  // Remove and add students

  async addStudent(dto: AddStudentDto) {
    const clas = await this.classRepo.findOne({
      where: { id: dto.classId },
      relations: { students: true },
    })
    const student = await this.studentRepo.findOne({ where: { id: dto.studentId } })

    if (!clas) throw new NotFoundException('Класс не найден')
    if (!student) throw new NotFoundException('Ученик не найден')
    if (clas.students.find(student => student.id === dto.studentId)) {
      throw new ForbiddenException('Ученик с таким id уже существует')
    }

    await this.studentRepo.update(student, {
      isAdmit: true,
      dateOfAccession: new Date().toISOString(),
    })

    await clas.students.push(student)

    const cacheKey = `${this.chacheKey}${dto.classId}`

    await this.cahceManager.del(cacheKey)

    return await this.classRepo.save(clas)
  }

  async removeStudent(dto: RemoveStudentDto) {
    const clas = await this.classRepo.findOne({
      where: { id: dto.classId },
      relations: { students: true },
    })

    if (!clas) throw new NotFoundException('Класс не найден')

    const updateStudent = clas.students.filter(student => student.id !== dto.studentId)

    const cacheKey = `${this.chacheKey}${dto.classId}`

    await this.cahceManager.del(cacheKey)

    return await this.classRepo.save({ ...clas, students: updateStudent })
  }

  // Remove and add lessons

  async addLesson(dto: AddLessonToClassDto) {
    const clas = await this.classRepo.findOne({
      where: { id: dto.classId },
      relations: { lessons: true },
    })
    const lesson = await this.lessonRepo.findOne({ where: { id: dto.lessonId } })

    if (!clas) throw new NotFoundException('Класс не найден')
    if (!lesson) throw new NotFoundException('Урок не найден')
    if (clas.lessons.find(lesson => lesson.id === dto.lessonId)) {
      throw new ForbiddenException('Урок с таким id уже добавлен')
    }

    await clas.lessons.push(lesson)

    const cacheKey = `${this.chacheKey}${dto.classId}`

    await this.cahceManager.del(cacheKey)

    return await this.classRepo.save(clas)
  }

  async update(id: number, dto: UpdateClassDto) {
    if (dto.name) await this.classRepo.update({ id }, { name: dto.name })
    if (dto.parallel) await this.classRepo.update({ id }, { parallel: dto.parallel })

    return { message: 'Class updated' }
  }

  remove(id: number) {
    return this.classRepo.delete({ id })
  }
}
