import { CacheInterceptor } from '@nestjs/cache-manager'
import { Body, Controller, Get, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyTeacherGuard } from 'src/guards/teacher.guard'
import { DaySchedule } from '../class-schedule/entities/day-schedule.entity'

import { SheduleActionsService } from './shedule-actions.service'

import { AddEmptyStudentInScheduleDto } from './dto/add-empty-student.dto'
import { QueryDayInScheduleDto } from './dto/query-day.dto'
import { RemoveEmptyStudentInScheduleDto } from './dto/remove-empty-students.dto'

@ApiTags('schedule-actions')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('shedule-actions')
export class SheduleActionsController {
  constructor(private readonly sheduleActionsService: SheduleActionsService) {}

  @ApiOkResponse({ description: 'Return Schedule', type: () => DaySchedule })
  @Get()
  findAll(@Query() dto: QueryDayInScheduleDto, @Req() req: Request) {
    return this.sheduleActionsService.findAll(dto, req[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({ description: 'Add student to empty list' })
  @UseGuards(OnlyTeacherGuard)
  @Put('/add/empty-students')
  addStudentsToEmptyList(@Body() dto: AddEmptyStudentInScheduleDto) {
    return this.sheduleActionsService.addEmptyStudent(dto)
  }

  @ApiOkResponse({ description: 'Add student to empty list' })
  @UseGuards(OnlyTeacherGuard)
  @Put('/remove/empty-students')
  removeStudentsToEmptyList(@Body() dto: RemoveEmptyStudentInScheduleDto) {
    return this.sheduleActionsService.removeEmptyStudent(dto)
  }
}
