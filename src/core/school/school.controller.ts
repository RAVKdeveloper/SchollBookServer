import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { School } from './entities/school.entity'
import { SchoolService } from './school.service'

import { FindAllSchoolsDto } from './dto/find-all-schools.dto'
import { ResponseGetAllSchoolsDto } from './res-dto/get-all-schools.dto'

@ApiTags('School')
@UseInterceptors(CacheInterceptor)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOkResponse({
    description: 'Get all schools',
    type: ResponseGetAllSchoolsDto,
    isArray: true,
  })
  @Get()
  findAll(@Query() dto: FindAllSchoolsDto) {
    return this.schoolService.findAll(dto)
  }

  @ApiOkResponse({ description: 'Get school', type: School })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(+id)
  }
}
