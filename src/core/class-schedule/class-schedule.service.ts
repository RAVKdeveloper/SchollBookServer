import { Injectable } from '@nestjs/common'
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto'
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto'

@Injectable()
export class ClassScheduleService {
  create(dto: CreateClassScheduleDto) {
    return dto
  }

  findAll() {
    return 'This action returns all classSchedule'
  }

  findOne(id: number) {
    return `This action returns a #${id} classSchedule`
  }

  update(id: number, dto: UpdateClassScheduleDto) {
    return `This action ${dto} a #${id} classSchedule`
  }

  remove(id: number) {
    return `This action removes a #${id} classSchedule`
  }
}
