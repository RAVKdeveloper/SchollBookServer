import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { CustomLogger } from './clickhous.service'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
      },
    }),
  ],
  controllers: [],
  providers: [CustomLogger],
})
export class ClickhousModule {}
