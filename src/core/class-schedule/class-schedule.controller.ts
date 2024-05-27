import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyTeacherGuard } from 'src/guards/teacher.guard'

import { ClassScheduleService } from './class-schedule.service'
import { ClassSchedule } from './entities/class-schedule.entity'

import { CreateClassScheduleDto } from './dto/create-class-schedule.dto'
import { CreateDaySchedulerDto } from './dto/create-day-scheduler.dto'
import { RemoveDayInScheduleDto } from './dto/remove-day.dto'

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

  @UseGuards(OnlyTeacherGuard)
  @ApiCreatedResponse({ description: 'Create new day schedule' })
  @Put('/add-new-day')
  addNewDaySchedule(@Body() dto: CreateDaySchedulerDto) {
    return this.classScheduleService.createDayScheduler(dto)
  }

  @UseGuards(OnlyTeacherGuard)
  @ApiCreatedResponse({ description: 'Remove day in schedule' })
  @Put('/remove-day')
  removeDayInSchedule(@Body() dto: RemoveDayInScheduleDto) {
    return this.classScheduleService.removeDayInSchedule(dto)
  }

  @UseGuards(OnlyTeacherGuard)
  @ApiOkResponse({ description: 'Get all class-schedules', isArray: true, type: ClassSchedule })
  @Get()
  findAll(@Query('classId') classId: string) {
    return this.classScheduleService.findAll(+classId)
  }

  @UseGuards(OnlyTeacherGuard)
  @ApiOkResponse({ description: 'Get one class-schedule', type: ClassSchedule })
  @ApiNotFoundResponse({ description: 'Расписание не найдено' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findOne(+id)
  }

  @UseGuards(OnlyTeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(+id)
  }
}
