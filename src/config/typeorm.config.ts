import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'

export class TypeOrmConfigClass {
  static getOrmConfig(config: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.get('host'),
      port: config.get('dbport'),
      username: config.get('dblogin'),
      password: config.get('password'),
      database: config.get('namedb'),
      // entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      autoLoadEntities: true,
    }
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configservice: ConfigService): Promise<TypeOrmModuleOptions> => {
    return TypeOrmConfigClass.getOrmConfig(configservice)
  },
  inject: [ConfigService],
}
