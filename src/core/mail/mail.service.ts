import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { AuthCodeDto } from './dto/authCode.dto'
import { LoginMailDto } from './dto/loginMail.dto'
import { MailSuccessfulCreateClassDto } from './dto/successful-create-class.dto'

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

  async loginMail(dto: LoginMailDto) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: dto.email,
        subject: 'Вход в аккаунт',
        text: 'Вы вошли в аккаунт SchoolBook',
        html: `<div>
                 Аккаунт: ${dto.email}
               </div>
               <div>
                 Время: ${new Date().toLocaleDateString('ru-RU', {
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric',
                   hour: 'numeric',
                   minute: 'numeric',
                 })}
               </div>
              `,
      })

      return { message: 'Message send' }
    } catch {
      throw new Error('Произошла Ошибка при отправке письма')
    }
  }

  async updatePassword(email: string) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: email,
        subject: 'Пароль изменён',
        text: 'Вы изменили пароль аккаунта',
        html: `<div>
                     Аккаунт: ${email}
                   </div>
                   <div>
                     Время: ${new Date().toLocaleDateString('ru-RU', {
                       year: 'numeric',
                       month: 'long',
                       day: 'numeric',
                       hour: 'numeric',
                       minute: 'numeric',
                     })}
                   </div>
                  `,
      })

      return { message: 'Message send' }
    } catch (e) {
      throw new Error('Произошла Ошибка при отправке письма')
    }
  }

  async successfulCreateClass(dto: MailSuccessfulCreateClassDto) {
    try {
      await this.service.sendMail({
        from: process.env.FROM_ADDRES,
        to: dto.email,
        subject: 'Вы создали класс',
        text: 'Создание класса',
        html: `<div>
                     ID школы: ${dto.school}
                   </div>
                   <ul>
                   <li>
                   Класс: ${dto.class}
                   </li>
                   <li>
                   Создателя: ${dto.createrUsername}
                   </li>
                   </ul>
                   <div>
                     Время: ${new Date().toLocaleDateString('ru-RU', {
                       year: 'numeric',
                       month: 'long',
                       day: 'numeric',
                       hour: 'numeric',
                       minute: 'numeric',
                     })}
                   </div>
                `,
      })

      return { message: 'Message send' }
    } catch {
      throw new InternalServerErrorException('Прозошла неизвестная ошибка')
    }
  }
}
