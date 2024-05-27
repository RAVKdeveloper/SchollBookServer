import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Raw, Repository } from 'typeorm'

import { ClassSchedule } from '../class-schedule/entities/class-schedule.entity'
import { DaySchedule } from '../class-schedule/entities/day-schedule.entity'

import { QueryDayInScheduleDto } from './dto/query-day.dto'

@Injectable()
export class SheduleActionsService {
  constructor(
    @InjectRepository(DaySchedule) private dayScheduleRepo: Repository<DaySchedule>,
    @InjectRepository(ClassSchedule) private classScheduleRepo: Repository<ClassSchedule>,
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

  findOne(id: number) {
    return `This action returns a #${id} sheduleAction`
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
}
