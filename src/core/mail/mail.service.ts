import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { AuthCodeDto } from './dto/authCode.dto'

@Injectable()
export class MailService {
  constructor(private service: MailerService) {}

  async sendAuthOneCod(dto: AuthCodeDto) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: dto.to,
        subject: 'Код Подтверждения',
        text: 'Потвердите вход в SchoolBook',
        html: `<h1>${dto.code}</h1>`,
      })

      return { message: 'Message send' }
    } catch {
      throw new Error('Произошла Ошибка при отправке письма')
    }
  }
}
