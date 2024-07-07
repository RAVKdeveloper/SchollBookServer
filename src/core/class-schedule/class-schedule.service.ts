import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { getWeek } from 'src/utils/getWeek.utils'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { ClassSchedule } from './entities/class-schedule.entity'
import { DaySchedule } from './entities/day-schedule.entity'

import { CheckIsEmptySchedule } from './dto/check-isempty-schedule.dto'
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto'
import { CreateDaySchedulerDto } from './dto/create-day-scheduler.dto'
import { RemoveDayInScheduleDto } from './dto/remove-day.dto'

@Injectable()
export class ClassScheduleService {
  constructor(
    @InjectRepository(ClassSchedule) private scheduleRepo: Repository<ClassSchedule>,
    @InjectRepository(DaySchedule) private dayScheduleRepo: Repository<DaySchedule>,
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async create(dto: CreateClassScheduleDto) {
    const date = this.getDate()

    await this.checkIsEmptySchedule({
      classId: dto.classId,
      currentWeek: date.week,
      currentYear: date.year,
    })

    const newSchedule = await this.scheduleRepo.save({
      class: { id: dto.classId },
      currentWeek: date.week,
      year: date.year,
      timelineStart: date.timelineStart,
      timelineEnd: date.timelineEnd,
    })

    if (dto.days.length === 0) return newSchedule

    Promise.all(
      dto.days.map(async day => {
        await this.createDayScheduler({ ...day, schedulerId: newSchedule.id })
      }),
    )

    return newSchedule
  }

  findAll(classId: number) {
    return this.scheduleRepo.find({
      relations: {
        days: true,
      },
      where: {
        class: { id: classId },
      },
    })
  }

  async findOne(id: number) {
    const scheduler = await this.scheduleRepo.findOne({
      where: { id },
      relations: {
        days: {
          lessons: {
            teacher: {
              userId: true,
            },
          },
          activeTeachers: {
            userId: true,
          },
          points: {
            student: {
              userId: true,
            },
          },
          homeWorks: {
            lesson: true,
          },
        },
      },
    })

    if (!scheduler) throw new NotFoundException('Расписание не найдено')

    return scheduler
  }

  async remove(id: number) {
    return await this.scheduleRepo.delete({ id })
  }

  // Utilits

  private getDate(): { week: number; year: string; timelineStart: string; timelineEnd: string } {
    try {
      const fullYer = new Date().getFullYear()
      const date = new Date()
      const currentWeek = getWeek(date)

      const curr = new Date()
      const firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay())).toISOString()
      const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)).toISOString()

      return {
        week: currentWeek,
        year: fullYer.toString(),
        timelineStart: `${firstDay}`,
        timelineEnd: `${lastDay}`,
      }
    } catch {
      throw new Error()
    }
  }

  // Day scheduler

  public async createDayScheduler(dto: CreateDaySchedulerDto) {
    const daySchedule = this.dayScheduleRepo.create({
      schedule: { id: dto.schedulerId },
      time: dto.time,
      dayName: dto.dayName,
      lessons: [],
      activeTeachers: [],
      date: dto.date,
    })

    const lessons = await Promise.all(
      dto.lessonsId.map(async id => {
        return await this.lessonRepo.findOne({ where: { id } })
      }),
    )

    const teachers = await Promise.all(
      dto.activeTeachersId.map(async id => {
        return await this.teacherRepo.findOne({ where: { id } })
      }),
    )

    daySchedule.activeTeachers.push(...teachers)
    daySchedule.lessons.push(...lessons)

    return this.dayScheduleRepo.save(daySchedule)
  }

  public async removeDayInSchedule(dto: RemoveDayInScheduleDto) {
    await Promise.all(
      dto.daysId.map(async dayId => {
        await this.dayScheduleRepo.delete({ id: dayId })
      }),
    )

    return 'Ok'
  }

  private async checkIsEmptySchedule(dto: CheckIsEmptySchedule) {
    const schedule = await this.scheduleRepo.findOne({
      where: {
        year: dto.currentYear,
        currentWeek: dto.currentWeek,
        class: { id: dto.classId },
      },
    })

    if (schedule) throw new ForbiddenException('Расписание на эту неделю уже существует')

    return 'Ok'
  }
}
