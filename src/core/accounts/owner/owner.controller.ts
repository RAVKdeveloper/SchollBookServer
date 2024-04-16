import { Controller, Post, Delete, UseGuards, Req } from '@nestjs/common'
import { ApiCookieAuth, ApiTags, ApiCreatedResponse } from '@nestjs/swagger'
import type { Request } from 'express'

import { AuthGuard } from 'src/guards/auth.guard'
import { OnlyOwnerGuard } from 'src/guards/owner.guard'
import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @ApiCreatedResponse({ description: 'Owner create', type: Owner })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request) {
    return this.ownerService.create(req['user'].userId)
  }

  @UseGuards(AuthGuard)
  @UseGuards(OnlyOwnerGuard)
  @Delete()
  remove(@Req() req: Request) {
    return this.ownerService.remove(req['user'].userId)
  }
}
