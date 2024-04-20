import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'
import { Roles } from 'src/basic/roles.type'

@Injectable()
export class OnlyTeacherGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const roles: string | string[] = request.headers[CustomHeaders.ROLE]

    if (!roles) throw new ForbiddenException()

    if (
      roles === Roles.TEACHER ||
      roles.includes(Roles.TEACHER) ||
      roles === Roles.MODERATOR ||
      roles.includes(Roles.MODERATOR)
    ) {
      return true
    }

    throw new ForbiddenException()
  }
}
