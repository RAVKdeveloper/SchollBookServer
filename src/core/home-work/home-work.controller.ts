import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyTeacherGuard } from 'src/guards/teacher.guard'

import { HomeWorkService } from './home-work.service'

import { HomeWork } from './entities/home-work.entity'

import { CreateHomeWorkDto } from './dto/create-home-work.dto'
import { QueryHomeWork } from './dto/query-home-work.dto'
import { UpdateHomeWorkDto } from './dto/update-home-work.dto'

@ApiTags('home-work')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('home-work')
export class HomeWorkController {
  constructor(private readonly homeWorkService: HomeWorkService) {}

  @ApiCreatedResponse({ description: 'Create home work', type: HomeWork })
  @UseGuards(OnlyTeacherGuard)
  @Post()
  create(@Body() dto: CreateHomeWorkDto, @Req() req: Request) {
    return this.homeWorkService.create(dto, req[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({ description: 'Get homeworks', type: HomeWork, isArray: true })
  @Get()
  findAll(@Query() query: QueryHomeWork) {
    return this.homeWorkService.findAll(query)
  }

  @ApiOkResponse({ description: 'Get home work bu ID', type: HomeWork })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeWorkService.findOne(+id)
  }

  @UseGuards(OnlyTeacherGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHomeWorkDto) {
    return this.homeWorkService.update(+id, dto)
  }

  @UseGuards(OnlyTeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeWorkService.remove(+id)
  }
}
