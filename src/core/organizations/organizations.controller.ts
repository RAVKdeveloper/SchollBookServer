import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'

import { Organization } from './entities/organization.entity'
import { OrganizationsService } from './organizations.service'

import { CreateOrganizationDto } from './dto/create-organization.dto'
import { FindAllOrganizationsDto } from './dto/find-all-organizations.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { ResponseGetAllOrganizationsDto } from './res-dto/res-get-all-organizations.dto'

@ApiTags('Organizations')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiCreatedResponse({ description: 'Created new organization', type: Organization })
  @Post()
  create(@Body() dto: CreateOrganizationDto, @Req() req: Request) {
    const userId = req[CustomHeaders.USER].userId
    return this.organizationsService.create(dto, userId)
  }

  @ApiOkResponse({
    description: 'Response all organizations by filter',
    type: ResponseGetAllOrganizationsDto,
  })
  @Post('/find')
  findAll(@Body() dto: FindAllOrganizationsDto, @Req() req: Request) {
    const userId = req[CustomHeaders.USER].userId
    return this.organizationsService.findAll(dto, userId)
  }

  @ApiOkResponse({ description: 'Return organization by id', type: Organization })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(+id)
  }

  @ApiCreatedResponse({
    description: 'Update organization',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @Patch(':id')
  update(@Body() dto: UpdateOrganizationDto, @Req() req: Request) {
    const userId = req[CustomHeaders.USER].userId
    return this.organizationsService.update(dto, userId)
  }

  @ApiOkResponse({
    description: 'Delete organization',
    schema: {
      type: 'object',
      example: {
        message: 'Ok',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req[CustomHeaders.USER].userId
    return this.organizationsService.remove(+id, userId)
  }
}
