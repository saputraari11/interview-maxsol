import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCountryDto } from './dto/create-country.dto'
import { GetCountriesFilterDto } from './dto/get-countries-filter.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CountryRepository } from './country.repository'
import { Country } from './country.entity'
import { getRepository } from 'typeorm'

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryRepository)
    private countryRepository: CountryRepository,
  ) {}

  async getCountries(filterDto: GetCountriesFilterDto) {
    const query = await Country.createQueryBuilder('country')

    const { name, page, limit } = filterDto

    if (name) {
      query.andWhere('LOWER(country.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      })
    }

    if (page && limit) {
      query.skip((page - 1) * limit).take(limit)
    }

    const [results, total] = await query.getManyAndCount()

    const users = {
      data: results,
      limit,
      page,
      total,
      count: results.length,
    }

    return users
  }

  async getCountryById(id: string): Promise<Country> {
    const country = await this.countryRepository.findOne({ where: { id: id } })
    if (!country) {
      throw new NotFoundException(`Country with ID "${id}" not found`)
    }
    return country
  }

  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryRepository.createCountry(createCountryDto)
  }

  async deleteCountry(id: string): Promise<void> {
    const country = await this.countryRepository.delete(id)

    if (country.affected === 0) {
      throw new NotFoundException(`Country with ID "${id}" not found`)
    }
  }

  async updateCountry(
    id: string,
    createCountryDto: CreateCountryDto,
  ): Promise<Country> {
    const { name, code } = createCountryDto
    const country = await this.getCountryById(id)
    country.name = name
    country.code = code
    country.save()

    return country
  }
}
