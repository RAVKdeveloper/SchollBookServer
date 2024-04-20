import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cache } from 'cache-manager'

import { Point } from './entities/point-system.entity'
import { CreatePointSystemDto } from './dto/create-point-system.dto'
import { UpdatePointSystemDto } from './dto/update-point-system.dto'
import { FindAllClassPointsDto } from './dto/find-all-class.dto'

@Injectable()
export class PointSystemService {
  private cacheKey = '/api/point-system/'

  constructor(
    @InjectRepository(Point) private pointRepo: Repository<Point>,
    @Inject('CACHE_MANAGER') private cahceManager: Cache,
  ) {}

  async create(dto: CreatePointSystemDto) {
    const chacheKeyDel = `${this.cacheKey}class?schoolId=${dto.schoolId}&classId=${dto.classId}`

    await this.cahceManager.del(chacheKeyDel)

    return await this.pointRepo.save({
      ...dto,
      school: { id: dto.schoolId },
      student: { id: dto.studentId },
      lesson: { id: dto.lessonId },
      classe: { id: dto.classId },
    })
  }

  findAllSchool(schoolId: number) {
    return this.pointRepo.find({
      relations: {
        student: {
          userId: true,
        },
        lesson: {
          teacher: {
            userId: true,
          },
        },
      },
      where: { school: { id: schoolId } },
    })
  }

  async findAllClass({ schoolId, classId }: FindAllClassPointsDto) {
    return await this.pointRepo.find({
      where: { school: { id: +schoolId }, classe: { id: +classId } },
      relations: {
        student: {
          userId: true,
        },
        lesson: {
          teacher: {
            userId: true,
          },
        },
      },
    })
  }

  async findOne(id: number) {
    const point = await this.pointRepo.findOne({
      where: { id },
      relations: {
        student: {
          userId: true,
        },
        lesson: {
          teacher: {
            userId: true,
          },
        },
        school: true,
        classe: true,
      },
    })

    if (!point) throw new NotFoundException('Оценка не найдена')

    return point
  }

  update(dto: UpdatePointSystemDto) {
    return this.pointRepo.update({ id: dto.id }, { point: dto.point })
  }

  remove(id: number) {
    return this.pointRepo.delete({ id })
  }
}
