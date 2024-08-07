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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyTeacherGuard } from 'src/guards/teacher.guard'

import { CreatePointSystemDto } from './dto/create-point-system.dto'
import { FindAllClassPointsDto } from './dto/find-all-class.dto'
import { UpdatePointSystemDto } from './dto/update-point-system.dto'
import { Point } from './entities/point-system.entity'
import { PointSystemService } from './point-system.service'

@ApiTags('Point-system')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('point-system')
export class PointSystemController {
  constructor(private readonly pointSystemService: PointSystemService) {}

  // @UseGuards(OnlyTeacherGuard)
  @ApiCreatedResponse({ description: 'Create point', type: Point })
  @Post()
  create(@Body() createPointSystemDto: CreatePointSystemDto) {
    return this.pointSystemService.create(createPointSystemDto)
  }

  @ApiOkResponse({ description: 'Find all this school points', isArray: true, type: Point })
  @Get()
  findAllSchool(@Query('schoolId') schoolId: string) {
    return this.pointSystemService.findAllSchool(+schoolId)
  }

  @ApiOkResponse({ description: 'Find all this class points', isArray: true, type: Point })
  @Get('class')
  findAllClass(@Query() dto: FindAllClassPointsDto) {
    return this.pointSystemService.findAllClass(dto)
  }

  @ApiOkResponse({ description: 'Find one point', type: Point })
  @ApiNotFoundResponse({ description: 'Оценка не найдена' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointSystemService.findOne(+id)
  }

  @UseGuards(OnlyTeacherGuard)
  @Patch(':id')
  update(@Body() dto: UpdatePointSystemDto) {
    return this.pointSystemService.update(dto)
  }

  @UseGuards(OnlyTeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointSystemService.remove(+id)
  }
}
