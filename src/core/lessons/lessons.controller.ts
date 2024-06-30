import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth.guard'

import { Lesson } from './entities/lesson.entity'
import { LessonsService } from './lessons.service'

@ApiTags('Lesson')
@UseInterceptors(CacheInterceptor)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOkResponse({ description: 'Get all lessons in the school', type: Lesson, isArray: true })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('all')
  findAll(@Query('id') id: string) {
    return this.lessonsService.findAll(+id)
  }

  @ApiOkResponse({ description: 'Get one teacher', type: Lesson })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id)
  }
}
