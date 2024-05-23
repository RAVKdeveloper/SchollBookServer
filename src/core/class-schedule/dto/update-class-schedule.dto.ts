import { PartialType } from '@nestjs/mapped-types'
import { CreateClassScheduleDto } from './create-class-schedule.dto'

export class UpdateClassScheduleDto extends PartialType(CreateClassScheduleDto) {}
