import { Module } from '@nestjs/common'
import { BanksUsersController } from './banks-users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BankUserRepository } from './bank-user.repository'
import { BanksUsersService } from './banks-users.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  controllers: [BanksUsersController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60' },
    }),
    TypeOrmModule.forFeature([BankUserRepository]),
  ],
  providers: [BanksUsersService],
})
export class BanksUsersModule {}
