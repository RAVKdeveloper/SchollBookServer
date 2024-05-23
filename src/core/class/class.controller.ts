import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  ApiTags,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import type { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyModeratorGuard } from 'src/guards/moderator.guard'
import { Class } from './entities/class.entity'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { AddChiefClassDto } from './dto/add-cheif.dto'
import { RemoveChiefClassDto } from './dto/remove-cheif.dto'
import { AddStudentDto } from './dto/add-student.dto'
import { RemoveStudentDto } from './dto/remove-student.dto'
import { AddLessonToClassDto } from './dto/add-lesson.dto'
import { RemoveLessonToClassDto } from './dto/remove-lesson.dto'

@ApiTags('Class')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiCreatedResponse({ description: 'Create class', type: Class })
  @ApiForbiddenResponse({ description: 'Такой класс уже существует' })
  @ApiNotFoundResponse({ description: 'Такой пользователь не существует' })
  @UseGuards(OnlyModeratorGuard)
  @Post()
  create(@Body() createClassDto: CreateClassDto, @Req() req: Request) {
    return this.classService.create(createClassDto, req[CustomHeaders.USER].userId)
  }

  @ApiCreatedResponse({ description: 'Add chief', type: Class })
  @ApiNotFoundResponse({ description: 'Класс не найден' })
  @ApiNotFoundResponse({ description: 'Учитель не найден' })
  @ApiForbiddenResponse({ description: 'Классный руководитель с таким id уже существует' })
  @UseGuards(OnlyModeratorGuard)
  @Put('chief')
  addChief(@Body() dto: AddChiefClassDto) {
    return this.classService.addChief(dto)
  }

  @ApiCreatedResponse({ description: 'Remove chief', type: Class })
  @ApiNotFoundResponse({ description: 'Класс не найден' })
  @ApiNotFoundResponse({ description: 'Учитель не найден' })
  @UseGuards(OnlyModeratorGuard)
  @Put('remove-chief')
  removeChief(@Body() dto: RemoveChiefClassDto) {
    return this.classService.removeChief(dto)
  }

  @ApiCreatedResponse({ description: 'Add students', type: Class })
  @ApiNotFoundResponse({ description: 'Класс не найден' })
  @ApiNotFoundResponse({ description: 'Ученик не найден' })
  @ApiForbiddenResponse({ description: 'Ученик с таким id уже существует' })
  @UseGuards(OnlyModeratorGuard)
  @Put('students')
  addStudents(@Body() dto: AddStudentDto) {
    return this.classService.addStudent(dto)
  }

  @ApiCreatedResponse({ description: 'Remove studens', type: Class })
  @ApiNotFoundResponse({ description: 'Класс не найден' })
  @ApiNotFoundResponse({ description: 'Ученик не найден' })
  @UseGuards(OnlyModeratorGuard)
  @Put('remove-students')
  removeStudents(@Body() dto: RemoveStudentDto) {
    return this.classService.removeStudent(dto)
  }

  @ApiCreatedResponse({ description: 'Add lesson', type: Class })
  @ApiNotFoundResponse({ description: 'Класс не найден' })
  @ApiNotFoundResponse({ description: 'Урок не найден' })
  @ApiForbiddenResponse({ description: 'Урок с таким id уже добавлен' })
  // @UseGuards(OnlyModeratorGuard)
  @Put('lesson')
  addLesson(@Body() dto: AddLessonToClassDto) {
    return this.classService.addLesson(dto)
  }

  @ApiCreatedResponse({ description: 'Remove lesson', type: Class })
  @ApiNotFoundResponse({ description: 'Класс не найден' })
  @UseGuards(OnlyModeratorGuard)
  @Put('remove-lesson')
  removeLesson(@Body() dto: RemoveLessonToClassDto) {
    return this.classService.removeLesson(dto)
  }

  @ApiOkResponse({ description: 'All classes for school', isArray: true, type: Class })
  @Get()
  findAll(@Query('school') id: string) {
    return this.classService.findAll(+id)
  }

  @ApiOkResponse({ description: 'All classes for school', isArray: true, type: Class })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id)
  }

  @UseGuards(OnlyModeratorGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto)
  }

  @UseGuards(OnlyModeratorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id)
  }
}
