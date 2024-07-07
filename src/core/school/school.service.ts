import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

import { School } from './entities/school.entity'

import { FindAllSchoolsDto } from './dto/find-all-schools.dto'

@Injectable()
export class SchoolService {
  constructor(@InjectRepository(School) private schoolRepo: Repository<School>) {}

  public async findAll(dto: FindAllSchoolsDto) {
    if (isNaN(+dto.limit) || isNaN(+dto.page)) {
      throw new BadRequestException('Невалидные данные')
    }

    const take = +dto.limit ?? 10
    const skip = (+dto.page - 1) * take

    const whereArray = this.getWhereObjByFilters(dto)

    const schools = await this.schoolRepo.find({
      relations: { owner: true },
      where: whereArray,
      skip,
      take,
      order: {
        id: 'DESC',
      },
    })

    const count = await this.schoolRepo.countBy(whereArray)

    return { count, data: schools }
  }

  public async findOne(id: number) {
    return await this.schoolRepo.findOne({
      where: { id },
      relations: { owner: true, teachers: true, lessons: true },
    })
  }

  private getWhereObjByFilters(dto: FindAllSchoolsDto) {
    const whereArr = []

    if (dto.searchValue) {
      const arr = [
        { name: ILike(`%${dto.searchValue}%`) },
        { location: ILike(`%${dto.searchValue}%`) },
        { region: ILike(`%${dto.searchValue}%`) },
      ]

      whereArr.push(...arr)
    }

    return whereArr
  }
}
