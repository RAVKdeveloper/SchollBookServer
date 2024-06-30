import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { ApiCookieAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth.guard'
import { TeacherService } from './teacher.service'

import { Teacher } from './entities/teacher.entity'

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOkResponse({ description: 'All teachers', type: Teacher, isArray: true })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.teacherService.findAll()
  }

  @ApiOkResponse({ description: 'Teachers this school', type: Teacher, isArray: true })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('all')
  findOneAllThisSchool(@Query('id') id: string) {
    return this.teacherService.findAllThisSchool(+id)
  }

  @ApiOkResponse({ description: 'Get teacher', type: Teacher })
  @ApiNotFoundResponse({ description: 'Учитель не найден' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id)
  }
}
