import { ClickHouseClient, createClient } from '@clickhouse/client'
import { Inject, Injectable } from '@nestjs/common'
import { PARAMS_PROVIDER_TOKEN, Params, PinoLogger } from 'nestjs-pino'

import type { QueryParams } from './interface/query.interface'

@Injectable()
export class CustomLogger extends PinoLogger {
  private readonly client: ClickHouseClient

  constructor(@Inject(PARAMS_PROVIDER_TOKEN) private params: Params) {
    super(params)
    this.client = createClient({
      url: process.env.CLICKHOUS_URL,
      username: process.env.CLICKHOUS_USERNAME,
      password: process.env.CLICKHOUS_PASSWORD,
    })
  }

  public async log(level: string, message: string, data: unknown = {}) {
    try {
      if (message && message.trim()) {
        const query = `INSERT INTO ${process.env.CLICKHOUS_TABLE} 
        (timestamp, level, message, data) 
        VALUES (now(), '${level}', '${message.trim()}', '${JSON.stringify(data)}'); 
        FORMAT JSON`

        return await this.client.query({
          query,
          // clickhouse_settings: {
          //   input_format_values_allow_data_after_semicolon: 1,
          // },
        })
      } else {
        this.logger.error('Пустой лог, не отправляем в Clickhouse')
      }
    } catch (error) {
      this.logger.error(error, { message, data })
      throw error
    }
  }

  public async query(query: QueryParams) {
    try {
      return await this.client.query(query)
    } catch (error) {
      this.logger.error(error, query.query)
      throw error
    }
  }
}
