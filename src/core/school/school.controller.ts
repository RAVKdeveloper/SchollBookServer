import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger'

import { OnlyOwnerGuard } from 'src/guards/owner.guard'
import { AuthGuard } from 'src/guards/auth.guard'
import { School } from './entities/school.entity'
import { SchoolService } from './school.service'
import { CreateSchoolDto } from './dto/create-school.dto'
import { UpdateSchoolDto } from './dto/update-school.dto'

@ApiTags('School')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiCreatedResponse({ description: 'School created', type: School })
  @UseGuards(AuthGuard)
  @UseGuards(OnlyOwnerGuard)
  @Post()
  create(@Body() dto: CreateSchoolDto) {
    return this.schoolService.create(dto)
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
