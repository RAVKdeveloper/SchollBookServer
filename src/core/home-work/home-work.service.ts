import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { And, In, Raw, Repository } from 'typeorm'

import { HomeWork } from './entities/home-work.entity'

import { CreateHomeWorkDto } from './dto/create-home-work.dto'
import { QueryHomeWork } from './dto/query-home-work.dto'
import { UpdateHomeWorkDto } from './dto/update-home-work.dto'

@Injectable()
export class HomeWorkService {
  constructor(@InjectRepository(HomeWork) private homeWorkRepo: Repository<HomeWork>) {}

  async create(dto: CreateHomeWorkDto, userId: number) {
    const newHomeWork = await this.homeWorkRepo.save({
      title: dto.title,
      description: dto.description,
      lesson: { id: dto.lessonId },
      daySchedule: { id: dto.dayScheduleId },
      creator: { id: userId },
      classe: { id: dto.classId },
    })

    return newHomeWork
  }

  async findAll(query: QueryHomeWork) {
    const whereObj: Record<string, unknown> = {}

    if (query.dateFrom && query.dateTo) {
      whereObj.daySchedule = {
        date: And(
          Raw(alias => `${alias} > :dateFrom`, { dateFrom: query.dateFrom }),
          Raw(alias => `${alias} <= :dateTo`, { dateTo: query.dateTo }),
        ),
      }
    }

    if (query.lessonId) {
      const lessonsId = JSON.parse(query.lessonId)
      if (Array.isArray(lessonsId)) whereObj.lesson = { id: In(lessonsId) }
      else throw new BadRequestException('Должен передаваться массив')
    }

    const homeWorks = await this.homeWorkRepo.find({
      relations: {
        lesson: {
          teacher: {
            userId: true,
          },
        },
        daySchedule: true,
      },
      where: {
        classe: { id: query.classId },
        ...whereObj,
      },
      order: {
        id: 'DESC',
      },
    })

    return homeWorks
  }

  async findOne(id: number) {
    const homeWork = await this.homeWorkRepo.findOne({
      relations: {
        lesson: {
          teacher: {
            userId: true,
          },
        },
        daySchedule: true,
      },
      where: {
        id,
      },
    })

    if (!homeWork) throw new NotFoundException('Домашнее задание не найдено')

    return homeWork
  }

  async update(id: number, dto: UpdateHomeWorkDto) {
    const whereObj: Record<string, unknown> = {}

    if (dto.title) whereObj.title = dto.title

    if (dto.description) whereObj.description = dto.description

    if (dto.dayScheduleId) whereObj.daySchedule = { id: dto.dayScheduleId }

    const updatedHomeWork = await this.homeWorkRepo.update(
      {
        id,
      },
      whereObj,
    )

    return updatedHomeWork
  }

  remove(id: number) {
    return this.homeWorkRepo.delete(id)
  }
}
