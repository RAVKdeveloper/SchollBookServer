import { ClickHouseSettings, DataFormat } from '@clickhouse/client'

interface BaseQueryParams {
  clickhouse_settings?: ClickHouseSettings
  query_params?: Record<string, unknown>
  abort_signal?: AbortSignal
  query_id?: string
  session_id?: string
  auth?: { username: string; password: string }
}

export interface QueryParams extends BaseQueryParams {
  query: string
  format?: DataFormat
}
