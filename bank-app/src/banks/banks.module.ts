import { Module } from '@nestjs/common'
import { BanksController } from './banks.controller'
import { BanksService } from './banks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BankRepository } from './bank.repository'
import { AuthModule } from '../auth/auth.module'
import { UsersService } from 'src/users/users.service'
import { CountryRepository } from 'src/countries/country.repository'
import { UserRepository } from 'src/users/user.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BankRepository,
      CountryRepository,
      UserRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60' },
    }),
  ],
  controllers: [BanksController],
  providers: [BanksService, UsersService],
})
export class BanksModule {}
