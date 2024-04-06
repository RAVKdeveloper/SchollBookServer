import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common'
import { ApiTags, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger'
import { Response } from 'express'

import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User created',
    type: User,
  })
  @ApiForbiddenResponse({ description: 'Пользователь с таким emаil уже существует' })
  @Post('register')
  registr(@Body() dto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(dto, res)
  }

  @Get()
  findAll() {
    return this.authService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id)
  }
}
