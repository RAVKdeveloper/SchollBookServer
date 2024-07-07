import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth.guard'
import { CheckRoleGuard } from 'src/guards/check-role.guard'

import { ClassService } from './class.service'

import { Class } from './entities/class.entity'

@ApiTags('Class')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOkResponse({ description: 'All classes for school', isArray: true, type: Class })
  @Get()
  findAll(@Query('school') id: string) {
    return this.classService.findAll(+id)
  }

  @ApiOkResponse({ description: 'All classes for school', isArray: true, type: Class })
  @UseGuards(CheckRoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id)
  }
}
