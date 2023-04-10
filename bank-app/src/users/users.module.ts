import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { BanksUsersService } from 'src/bank-users/banks-users.service'
import { BankUserRepository } from 'src/bank-users/bank-user.repository'
import { CountryRepository } from 'src/countries/country.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      CountryRepository,
      BankUserRepository,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, BanksUsersService],
  exports: [UsersService],
})
export class UsersModule {}
