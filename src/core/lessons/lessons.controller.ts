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
  Put,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { CacheInterceptor } from '@nestjs/cache-manager'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyModeratorGuard } from 'src/guards/moderator.guard'

import { Lesson } from './entities/lesson.entity'
import { LessonsService } from './lessons.service'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { AddTeacherToLessonDto } from './dto/add-teacher.dto'
import { RemoveTeacherInTheLessonDto } from './dto/remove-teacher.dto'

@ApiTags('Lesson')
@UseInterceptors(CacheInterceptor)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiCreatedResponse({ description: 'Lesson created', type: Lesson })
  @ApiForbiddenResponse({ description: 'Роут недоступен' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @UseGuards(OnlyModeratorGuard)
  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto)
  }

  @ApiCreatedResponse({ description: 'Add teacher for lesson', type: Lesson })
  @ApiNotFoundResponse({ description: 'Урок или учитель не найдены' })
  @ApiForbiddenResponse({ description: 'Пользователь уже добавлен' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @UseGuards(OnlyModeratorGuard)
  @Post('teacher')
  addTeacher(@Body() dto: AddTeacherToLessonDto) {
    return this.lessonsService.addTeacher(dto)
  }

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

  @UseGuards(AuthGuard)
  @UseGuards(OnlyModeratorGuard)
  @ApiCookieAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto)
  }

  @ApiOkResponse({ description: 'Update lesson', type: Lesson, isArray: true })
  @UseGuards(AuthGuard)
  @UseGuards(OnlyModeratorGuard)
  @ApiCookieAuth()
  @Put('teacher')
  removeTeacher(@Body() dto: RemoveTeacherInTheLessonDto) {
    return this.lessonsService.deleteTeacherForLessen(dto)
  }

  @UseGuards(AuthGuard)
  @UseGuards(OnlyModeratorGuard)
  @ApiCookieAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id)
  }
}
