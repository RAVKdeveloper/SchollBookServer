import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common'
import {
  ApiTags,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import type { Request } from 'express'

import { AuthGuard } from 'src/guards/auth.guard'
import { TeacherService } from './teacher.service'

import { Teacher } from './entities/teacher.entity'
import { CreateTeacherDto } from './dto/create-teacher.dto'
import { UpdateTeacherDto } from './dto/update-teacher.dto'

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiCreatedResponse({ description: 'Teacher created', type: Teacher })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateTeacherDto, @Req() req: Request) {
    return this.teacherService.create(dto, req['user'].userId)
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto)
  }

  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id)
  }
}
