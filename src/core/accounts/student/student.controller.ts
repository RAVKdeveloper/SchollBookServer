import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CacheInterceptor } from '@nestjs/cache-manager'

import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@ApiTags('Student')
@UseInterceptors(CacheInterceptor)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto)
  }

  @Get()
  findAll() {
    return this.studentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id)
  }
}
