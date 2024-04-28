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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiCookieAuth,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { CacheInterceptor } from '@nestjs/cache-manager'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyTeacherGuard } from 'src/guards/teacher.guard'

import { ClassSchedule } from './entities/class-schedule.entity'
import { ClassScheduleService } from './class-schedule.service'
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto'
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto'

@ApiTags('classSchedule')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('class-schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @UseGuards(OnlyTeacherGuard)
  @ApiCreatedResponse({ description: 'Create class-schedule', type: ClassSchedule })
  @Post()
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classScheduleService.create(createClassScheduleDto)
  }

  @ApiOkResponse({ description: 'Get all class-schedules', isArray: true, type: ClassSchedule })
  @Get()
  findAll() {
    return this.classScheduleService.findAll()
  }

  @ApiOkResponse({ description: 'Get one class-schedule', type: ClassSchedule })
  @ApiNotFoundResponse({ description: 'Расписание не найдено' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findOne(+id)
  }

  @UseGuards(OnlyTeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassScheduleDto: UpdateClassScheduleDto) {
    return this.classScheduleService.update(+id, updateClassScheduleDto)
  }

  @UseGuards(OnlyTeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(+id)
  }
}
