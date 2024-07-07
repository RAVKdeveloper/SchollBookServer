import { ForbiddenException, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { CustomLogger } from './clickhous/clickhous.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  const configService = app.get(ConfigService)

  const whitelistDomains = [process.env.FRONT_URL, 'http://localhost:5001']

  app.useLogger(app.get(CustomLogger))

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelistDomains.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new ForbiddenException('Доступ запрещен'))
      }
    },
  })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('SchoolBook')
    .setDescription('SchoolBook System Api')
    .setVersion('1.0')
    .addTag('schoolbook')
    .addCookieAuth('acces_token_auth')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document)

  await app.listen(configService.get('port'))
}
bootstrap()
