import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { MailerModule } from '@nestjs-modules/mailer'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { ScheduleModule } from '@nestjs/schedule'

import configuration from 'src/config/configuration'
import { typeOrmConfig } from 'src/config/typeorm.config'

import { AuthModule } from './core/auth/auth.module'
import { UserModule } from './core/user/user.module'
import { JwtGenService } from './core/jwt/jwt.service'
import { MailService } from './core/mail/mail.service'
import { OwnerModule } from './core/accounts/owner/owner.module'
import { StudentModule } from './core/accounts/student/student.module'
import { TeacherModule } from './core/accounts/teacher/teacher.module'
import { SchoolModule } from './core/school/school.module'
import { LessonsModule } from './core/lessons/lessons.module'
import { ClassModule } from './core/class/class.module'
import { PointSystemModule } from './core/point-system/point-system.module'

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
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    OwnerModule,
    StudentModule,
    TeacherModule,
    SchoolModule,
    LessonsModule,
    ClassModule,
    PointSystemModule,
  ],
  controllers: [],
  providers: [JwtGenService, MailService],
})
export class AppModule {}
