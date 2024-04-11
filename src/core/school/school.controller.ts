import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { OnlyOwnerGuard } from 'src/guards/owner.guard'
import { AuthGuard } from 'src/guards/auth.guard'
import { SchoolService } from './school.service'
import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'

@ApiTags('School')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @UseGuards(AuthGuard)
  @UseGuards(OnlyOwnerGuard)
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto)
  }

  @Get()
  findAll() {
    return this.schoolService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(+id, updateSchoolDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.remove(+id)
  }
}
