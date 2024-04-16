import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import type { Request } from 'express'

import { CustomHeaders } from 'src/basic/headers.type'

@Injectable()
export class IpGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const ip = request.headers['x-forwarded-for'] || request.socket?.remoteAddress

    if (!ip || ip.length === 0) throw new ForbiddenException('Не удалось определить ip аддрес')

    if (Array.isArray(ip)) request['ip'] = ip.join(',')
    else request[CustomHeaders.IP] = ip

    return true
  }
}
