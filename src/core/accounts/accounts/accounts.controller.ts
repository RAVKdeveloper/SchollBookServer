import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
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
import type { Request, Response } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'
import { CheckRoleGuard } from 'src/guards/check-role.guard'

import { Parent } from './entities/parent.entity'
import { Student } from './entities/student.entity'

import { AccountsService } from './accounts.service'

import { CreateParentAccDto } from './dto/create-parent.dto'
import { CreateStudentDto } from './dto/create-student.dto'

@ApiTags('Accounts')
@ApiCookieAuth()
@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiCreatedResponse({ description: 'Create student', type: Student })
  @Post('/student')
  create(
    @Body() dto: CreateStudentDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req[CustomHeaders.USER].userId
    return this.accountsService.createStudentAcc(dto, userId, res)
  }

  @ApiCreatedResponse({ description: 'Create parent', type: Parent })
  @Post('/parent')
  createParent(
    @Body() dto: CreateParentAccDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req[CustomHeaders.USER].userId
    return this.accountsService.createParentAcc(dto, userId, res)
  }

  @ApiCreatedResponse({ description: 'Get my students', type: [Student] })
  @UseGuards(CheckRoleGuard)
  @Get('/my-childrens')
  getMyChildrens(@Req() req: Request) {
    const parentId = req[CustomHeaders.ROLE].parentId
    return this.accountsService.getMyChildrens(parentId)
  }

  @ApiOkResponse({ description: 'Get user', type: Student })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Get('/student/:id')
  findOneStudent(@Param('id') id: string) {
    return this.accountsService.findOneStudent(+id)
  }

  @ApiOkResponse({ description: 'Get user', type: Parent })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Get('/parent/:id')
  findOneParentById(@Param('id') id: string) {
    return this.accountsService.findOneParentById(+id)
  }
}
