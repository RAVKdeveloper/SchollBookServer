import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyOwnerGuard } from 'src/guards/owner.guard'
// import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'
// import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request) {
    return this.ownerService.create(req['user'].userId)
  }

  @Get()
  findAll() {
    return this.ownerService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto)
  }

  @UseGuards(AuthGuard)
  @UseGuards(OnlyOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id)
  }
}
