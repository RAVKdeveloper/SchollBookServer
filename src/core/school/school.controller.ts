import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { School } from './entities/school.entity'
import { SchoolService } from './school.service'

@ApiTags('School')
@UseInterceptors(CacheInterceptor)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

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
}
