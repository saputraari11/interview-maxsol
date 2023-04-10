import { Repository, EntityRepository } from 'typeorm'
import { Country } from './country.entity'
import { CreateCountryDto } from './dto/create-country.dto'

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  async createCountry(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name } = createCountryDto

    const country = new Country()
    country.name = name
    country.code = createCountryDto.code
    await country.save()

    return country
  }
}
