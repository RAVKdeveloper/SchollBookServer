import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { MailerModule } from '@nestjs-modules/mailer'

import configuration from 'src/config/configuration'
import { typeOrmConfig } from 'src/config/typeorm.config'

import { AuthModule } from './core/auth/auth.module'
import { UserModule } from './core/user/user.module'
import { JwtGenService } from './core/jwt/jwt.service'
import { MailService } from './core/mail/mail.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.LOGIN,
          pass: process.env.EMAIL_PASS,
        },
        secure: true,
        port: Number(process.env.EMAIL_PORT),
      },
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [JwtGenService, MailService],
})
export class AppModule {}
