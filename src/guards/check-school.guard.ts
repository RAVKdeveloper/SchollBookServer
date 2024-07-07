import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import type { Request } from 'express'

import { CustomHeaders } from '../basic/headers.type'

interface Options {
  readonly inQuery?: boolean
  readonly inParams?: boolean
  readonly inBody?: boolean
}

@Injectable()
export class CheckMySchoolGuard implements CanActivate {
  constructor(private readonly options: Options) {
    this.options = options
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const token = req[CustomHeaders.ROLE]

    if (!token) throw new NotFoundException('Нет токена')

    if (!token.schoolId || isNaN(+token.schoolId)) {
      throw new NotFoundException('Id школы не найдено')
    }

    if (this.options.inParams && ['GET', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      const paramSchoolId = req.params.id

      if (isNaN(+paramSchoolId)) throw new ForbiddenException('Неверный id школы')

      if (+token.schoolId !== +paramSchoolId) {
        throw new ForbiddenException('Неверный id школы')
      }

      return true
    }

    if (this.options.inQuery && req.method === 'GET') {
      const querySchoolId = req.query.schoolId

      if (isNaN(+querySchoolId)) throw new ForbiddenException('Неверный id школы')

      if (+token.schoolId !== +querySchoolId) {
        throw new ForbiddenException('Неверный id школы')
      }

      return true
    }

    if (this.options.inBody && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const bodySchoolId: number = req.body.schoolId

      if (isNaN(+bodySchoolId)) throw new ForbiddenException('Неверный id школы')

      if (+token.schoolId !== bodySchoolId) {
        throw new ForbiddenException('Неверный id школы')
      }

      return true
    }
  }
}
