import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiCookieAuth } from '@nestjs/swagger'
import { CacheInterceptor } from '@nestjs/cache-manager'
import type { Request } from 'express'

import { OnlyOwnerGuard } from 'src/guards/owner.guard'
import { AuthGuard } from 'src/guards/auth.guard'
import { School } from './entities/school.entity'
import { SchoolService } from './school.service'
import { CreateSchoolDto } from './dto/create-school.dto'

@ApiTags('School')
@UseInterceptors(CacheInterceptor)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiCreatedResponse({ description: 'School created', type: School })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @UseGuards(OnlyOwnerGuard)
  @Post()
  create(@Body() dto: CreateSchoolDto, @Req() req: Request) {
    return this.schoolService.create(dto, req['user'].userId)
  }

  @ApiOkResponse({
    description: 'Get all schools',
    type: School,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.schoolService.findAll()
  }

  @ApiOkResponse({ description: 'Get school', type: School })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @UseGuards(OnlyOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.schoolService.remove(+id, req['user'].userId)
  }
}
