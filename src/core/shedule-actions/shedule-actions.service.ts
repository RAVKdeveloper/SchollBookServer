import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Raw, Repository } from 'typeorm'

import { Student } from '../accounts/student/entities/student.entity'
import { ClassSchedule } from '../class-schedule/entities/class-schedule.entity'
import { DaySchedule } from '../class-schedule/entities/day-schedule.entity'

import { AddEmptyStudentInScheduleDto } from './dto/add-empty-student.dto'
import { QueryDayInScheduleDto } from './dto/query-day.dto'
import { RemoveEmptyStudentInScheduleDto } from './dto/remove-empty-students.dto'

@Injectable()
export class SheduleActionsService {
  constructor(
    @InjectRepository(DaySchedule) private dayScheduleRepo: Repository<DaySchedule>,
    @InjectRepository(ClassSchedule) private classScheduleRepo: Repository<ClassSchedule>,
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async findAll(dto: QueryDayInScheduleDto, userId: number) {
    const schedule = await this.checkCredentialsSchedule(+dto.classId, +dto.schoolId)

    const daySchedule = await this.dayScheduleRepo.findOne({
      relations: {
        lessons: {
          teacher: {
            userId: true,
          },
        },
        activeTeachers: {
          userId: true,
        },
        points: {
          lesson: true,
          student: {
            userId: true,
          },
        },
        emptyStudents: {
          userId: true,
        },
        homeWorks: {
          lesson: {
            teacher: {
              userId: true,
            },
          },
        },
      },
      where: {
        schedule: { id: schedule.id },
        date: Raw(alias => `${alias} = :date`, { date: dto.date }),
      },
    })

    if (!daySchedule) {
      throw new NotFoundException(`Расписание на ${dto.date} не найдено`)
    }

    const myPoints = daySchedule.points.filter(({ student }) => {
      return student.userId.id === userId
    })

    return { ...daySchedule, points: myPoints }
  }

  async addEmptyStudent(dto: AddEmptyStudentInScheduleDto) {
    const daySchedule = await this.checkIsNotEmptyDaySchedule(dto.dayId)

    const isIncludesStudent = daySchedule.emptyStudents.find(({ id }) => {
      return dto.studentsId.includes(id)
    })

    if (isIncludesStudent) throw new ForbiddenException('Ученик с таким id уже добавлен')

    const students = await Promise.all(
      dto.studentsId.map(async id => {
        return await this.studentRepo.findOne({ where: { id } })
      }),
    )

    await this.dayScheduleRepo.save({
      ...daySchedule,
      emptyStudents: [...daySchedule.emptyStudents, ...students],
    })

    return `Ученики с ${dto.studentsId.join(', ')} добавлены`
  }

  async removeEmptyStudent(dto: RemoveEmptyStudentInScheduleDto) {
    const daySchedule = await this.checkIsNotEmptyDaySchedule(dto.dayId)

    const isIncludesStudent = daySchedule.emptyStudents.find(({ id }) => {
      return dto.studentsId.includes(id)
    })

    if (!isIncludesStudent) throw new ForbiddenException('Ученик с таким id не был добавлен')

    const newStudents = daySchedule.emptyStudents.filter(({ id }) => !dto.studentsId.includes(id))

    await this.dayScheduleRepo.save({
      ...daySchedule,
      emptyStudents: newStudents,
    })

    return `Ученики с ${dto.studentsId.join(', ')} удалены со списка прогульщиков `
  }

  private async checkCredentialsSchedule(classId: number, schoolId: number) {
    const schedule = await this.classScheduleRepo.findOne({
      where: {
        class: { id: classId, school: { id: schoolId } },
      },
    })

    if (!schedule) throw new NotFoundException('Расписание не найдено')

    return schedule
  }

  private async checkIsNotEmptyDaySchedule(id: number) {
    const daySchedule = await this.dayScheduleRepo.findOne({
      where: { id },
      relations: {
        emptyStudents: true,
      },
    })

    if (!daySchedule) throw new NotFoundException('Расписание не существует')

    return daySchedule
  }
}
