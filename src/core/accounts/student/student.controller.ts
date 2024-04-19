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
} from '@nestjs/common'
import {
  ApiTags,
  ApiCreatedResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { CacheInterceptor } from '@nestjs/cache-manager'
import type { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'
import { Student } from './entities/student.entity'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@ApiTags('Student')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiCreatedResponse({ description: 'Create student', type: Student })
  @Post()
  create(@Body() dto: CreateStudentDto, @Req() req: Request) {
    return this.studentService.create(dto, req[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({ description: 'All students for school', type: Student, isArray: true })
  @Get()
  findAll(@Query('school') id: string) {
    return this.studentService.findAll(+id)
  }

  @ApiOkResponse({ description: 'Get user', type: Student })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.studentService.remove(+id, req[CustomHeaders.USER].userId)
  }
}
