import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Param, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'

import { SheduleActionsService } from './shedule-actions.service'

import { QueryDayInScheduleDto } from './dto/query-day.dto'

@ApiTags('schedule-actions')
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('shedule-actions')
export class SheduleActionsController {
  constructor(private readonly sheduleActionsService: SheduleActionsService) {}

  @Get()
  findAll(@Query() dto: QueryDayInScheduleDto, @Req() req: Request) {
    return this.sheduleActionsService.findAll(dto, req[CustomHeaders.USER].userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheduleActionsService.findOne(+id)
  }
}
