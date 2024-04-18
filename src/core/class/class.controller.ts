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
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyModeratorGuard } from 'src/guards/moderator.guard'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@ApiTags('Class')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@UseGuards(OnlyModeratorGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto)
  }

  @Get()
  findAll() {
    return this.classService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id)
  }
}