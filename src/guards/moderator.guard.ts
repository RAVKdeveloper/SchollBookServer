import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class OnlyModeratorGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const roles: string | string[] = request.headers['role']

    if (!roles) throw new ForbiddenException()

    if (
      roles === 'OWNER' ||
      roles.includes('OWNER') ||
      roles === 'MODERATOR' ||
      roles.includes('MODERATOR')
    ) {
      return true
    } else throw new ForbiddenException()
  }
}
