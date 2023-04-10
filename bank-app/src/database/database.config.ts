import { Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import databaseConfig from '../config/database.config'

import { User } from '../users/user.entity'
import { Bank } from '../banks/bank.entity'
import { Country } from '../countries/country.entity'
import { BankUser } from '../bank-users/bank-user.entity'

export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private config: ConfigType<typeof databaseConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...this.config,
      type: 'postgres',
      entities: [User, Country, Bank, BankUser],
    }
  }
}
