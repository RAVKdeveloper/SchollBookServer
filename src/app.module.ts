import { MailerModule } from '@nestjs-modules/mailer'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PrometheusModule } from '@willsoto/nestjs-prometheus'
import { redisStore } from 'cache-manager-redis-yet'

import configuration from 'src/config/configuration'
import { typeOrmConfig } from 'src/config/typeorm.config'

import { ClickhousModule } from './clickhous/clickhous.module'
import { AccountsModule } from './core/accounts/accounts/accounts.module'
import { TeacherModule } from './core/accounts/teacher/teacher.module'
import { AuthModule } from './core/auth/auth.module'
import { ClassScheduleModule } from './core/class-schedule/class-schedule.module'
import { ClassModule } from './core/class/class.module'
import { HomeWorkModule } from './core/home-work/home-work.module'
import { JwtGenService } from './core/jwt/jwt.service'
import { LessonsModule } from './core/lessons/lessons.module'
import { MailService } from './core/mail/mail.service'
import { OrganizationsModule } from './core/organizations/organizations.module'
import { PointSystemModule } from './core/point-system/point-system.module'
import { SchoolModule } from './core/school/school.module'
import { SheduleActionsModule } from './core/shedule-actions/shedule-actions.module'
import { UserModule } from './core/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
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
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async config => {
        const store = await redisStore({
          socket: {
            host: config.get('redis.host'),
            port: config.get('redis.port'),
          },
          ttl: 10000,
        })

        return { store, ttl: 10000 }
      },
      inject: [ConfigService],
    }),
    PrometheusModule.register({
      path: '/metrics',
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    AccountsModule,
    TeacherModule,
    SchoolModule,
    LessonsModule,
    ClassModule,
    PointSystemModule,
    ClassScheduleModule,
    SheduleActionsModule,
    HomeWorkModule,
    OrganizationsModule,
    ClickhousModule,
  ],
  controllers: [],
  providers: [JwtGenService, MailService],
})
export class AppModule {}
