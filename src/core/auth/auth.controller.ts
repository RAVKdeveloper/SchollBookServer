import { Controller, Get, Post, Body, Res, UseGuards, Req, Patch } from '@nestjs/common'
import {
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCookieAuth,
} from '@nestjs/swagger'
import { Response, Request } from 'express'

import { AuthGuard } from 'src/guards/auth.guard'
import { User } from '../user/entities/user.entity'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ForgotPassDto } from './dto/forgot-pass.dto'
import { VerifyCodeDto } from './dto/verify-code.dto'
import { UpdatePasswordDto } from './dto/update-pass.dto'

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

  @ApiOkResponse({
    description: 'User successful login',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'Неверный логин или пароль' })
  @Post('login')
  login(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res)
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
    return this.authService.me(request['user'].userId)
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
  @UseGuards(AuthGuard)
  @Post('verify')
  verifyAccount(@Body() dto: VerifyCodeDto) {
    return this.authService.verifyAccount(dto)
  }

  @ApiOkResponse({ description: 'Пароль изменён' })
  @ApiForbiddenResponse({ description: 'Неверный код доступа' })
  @ApiNotFoundResponse({ description: 'Такого пользователя не существует' })
  @Patch('updatePass')
  passwordUpdate(@Body() dto: UpdatePasswordDto) {
    return this.authService.passwordUpdate(dto)
  }
}
