import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CacheInterceptor } from '@nestjs/cache-manager'

import { AuthGuard } from 'src/guards/auth.guard'

import { ClassScheduleService } from './class-schedule.service'
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto'
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto'

@ApiTags('classSchedule')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('class-schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @Post()
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classScheduleService.create(createClassScheduleDto)
  }

  @Get()
  findAll() {
    return this.classScheduleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassScheduleDto: UpdateClassScheduleDto) {
    return this.classScheduleService.update(+id, updateClassScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(+id)
  }
}
