import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { getWeek } from 'src/utils/getWeek.utils'
import { Teacher } from '../accounts/teacher/entities/teacher.entity'
import { Lesson } from '../lessons/entities/lesson.entity'
import { ClassSchedule } from './entities/class-schedule.entity'
import { DaySchedule } from './entities/day-schedule.entity'

import { CreateClassScheduleDto } from './dto/create-class-schedule.dto'
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto'
import { CreateDaySchedulerDto } from './dto/create-day-scheduler.dto'

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
    const newSchedule = await this.scheduleRepo.save({
      class: { id: dto.classId },
      currentWeek: date.week,
      year: date.year,
    })

    if (!dto.day) return newSchedule

    await this.createDayScheduler({ day: { ...dto.day }, schedulerId: newSchedule.id })

    return newSchedule
  }

  findAll() {
    return this.scheduleRepo.find({
      relations: {
        days: true,
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
        },
      },
    })

    if (!scheduler) throw new NotFoundException('Расписание не найдено')

    return scheduler
  }

  update(id: number, dto: UpdateClassScheduleDto) {
    return `This action ${dto} a #${id} classSchedule`
  }

  remove(id: number) {
    return this.scheduleRepo.delete({ id })
  }

  // Utilits

  private getDate(): { week: number; year: string } {
    try {
      const fullYer = new Date().getFullYear()
      const date = new Date()
      const currentWeek = getWeek(date)

      return { week: currentWeek, year: fullYer.toString() }
    } catch {
      throw new Error()
    }
  }

  // Day scheduler

  private async createDayScheduler(dto: CreateDaySchedulerDto) {
    const daySchedule = this.dayScheduleRepo.create({
      schedule: { id: dto.schedulerId },
      time: dto.day.time,
      dayName: dto.day.dayName,
      lessons: [],
      activeTeachers: [],
    })

    const lessons = await Promise.all(
      dto.day.lessonsId.map(async id => {
        return await this.lessonRepo.findOne({ where: { id } })
      }),
    )

    const teachers = await Promise.all(
      dto.day.activeTeachersId.map(async id => {
        return await this.teacherRepo.findOne({ where: { id } })
      }),
    )

    daySchedule.activeTeachers.push(...teachers)
    daySchedule.lessons.push(...lessons)

    return this.dayScheduleRepo.save(daySchedule)
  }
}
