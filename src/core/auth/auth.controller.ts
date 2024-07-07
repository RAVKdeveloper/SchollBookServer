import { Body, Controller, Get, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common'
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Request, Response } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { AuthGuard } from 'src/guards/auth.guard'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'

import { CreateAuthDto } from './dto/create-auth.dto'
import { ForgotPassDto } from './dto/forgot-pass.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UpdatePasswordDto } from './dto/update-pass.dto'
import { VerifyCodeDto } from './dto/verify-code.dto'

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
  registration(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto)
  }

  @ApiOkResponse({
    description: 'User successful login',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'Неверный логин или пароль' })
  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto)
  }

  @ApiOkResponse({
    description: 'Userdata',
    type: User,
  })
  @ApiForbiddenResponse({ description: 'Акаунт не активирован' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() request: Request) {
    return this.authService.me(request[CustomHeaders.USER].userId)
  }

  @ApiOkResponse({ description: 'Возвращает пользователя', type: User })
  @ApiNotFoundResponse({ description: 'Пользователь не найден' })
  @Post('forgotPass')
  forgotPass(@Body() dto: ForgotPassDto) {
    return this.authService.forgotPass(dto)
  }

  @ApiCookieAuth()
  @ApiCreatedResponse({ description: 'Verify account' })
  @ApiForbiddenResponse({ description: 'Неверный код доступа' })
  @Post('verify')
  verifyAccount(@Body() dto: VerifyCodeDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.verifyAccount(dto, res)
  }

  @ApiOkResponse({ description: 'Пароль изменён' })
  @ApiForbiddenResponse({ description: 'Неверный код доступа' })
  @ApiNotFoundResponse({ description: 'Такого пользователя не существует' })
  @UseGuards(AuthGuard)
  @Patch('updatePass')
  passwordUpdate(@Body() dto: UpdatePasswordDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.passwordUpdate(dto, res)
  }

  @ApiOkResponse({ description: 'Delete cookie' })
  @ApiCookieAuth()
  @ApiForbiddenResponse({ description: 'Нет токена' })
  @UseGuards(AuthGuard)
  @Put('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res)
  }
}
