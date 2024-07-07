import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { CookiesNames } from 'src/basic/cookie-names.basic'
import { CustomHeaders } from 'src/basic/headers.type'

@Injectable()
export class OnlyModeratorGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const token = request.cookies[CookiesNames.ROLE]

    if (!token) {
      throw new ForbiddenException('Нет токена')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.secretJWT,
      })

      if (payload && (payload.ownerId || payload.moderatorId)) {
        request[CustomHeaders.ROLE] = payload
      } else {
        throw new ForbiddenException('Доступ запрещен')
      }
    } catch (e) {
      throw new ForbiddenException('Доступ запрещен')
    }
    return true
  }
}
