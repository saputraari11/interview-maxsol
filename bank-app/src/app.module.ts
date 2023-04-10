import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { BanksUsersModule } from './bank-users/banks-users.module'
import { BanksModule } from './banks/banks.module'
import { AppConfigModule } from './config/config.module'
import { CountriesModule } from './countries/countries.module'
import { DatabaseModule } from './database/database.module'
import { UsersMiddleware } from './users/users.middleware'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    DatabaseModule,
    AuthModule,
    CountriesModule,
    BanksModule,
    UsersModule,
    BanksUsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes({ path: '/auth/signup', method: RequestMethod.ALL })
  }
}
