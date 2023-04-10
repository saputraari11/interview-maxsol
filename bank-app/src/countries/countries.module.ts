import { Module } from '@nestjs/common'
import { CountriesController } from './countries.controller'
import { CountriesService } from './countries.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryRepository } from './country.repository'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository]), AuthModule],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
