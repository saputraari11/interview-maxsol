import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'
import { CountriesService } from './countries.service'
import { CreateCountryDto } from './dto/create-country.dto'
import { GetCountriesFilterDto } from './dto/get-countries-filter.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('countries')
@UseGuards(AuthGuard('jwt'))
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  async getCountries(@Query(ValidationPipe) filterDto: GetCountriesFilterDto) {
    const {
      data,
      limit,
      page,
      total,
      count,
    } = await this.countriesService.getCountries(filterDto)
    return {
      data,
      limit: parseInt(limit + ''),
      page: parseInt(page + ''),
      total,
      count,
    }
  }

  @Get('/:id')
  async getCountryByid(@Param('id') id: string) {
    const result = await this.countriesService.getCountryById(id)
    return {
      data: result,
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCountry(@Body() createCountryDto: CreateCountryDto) {
    const result = await this.countriesService.createCountry(createCountryDto)
    return {
      data: result,
    }
  }

  @Delete('/:id')
  deleteCountry(@Param('id') id: string): Promise<void> {
    return this.countriesService.deleteCountry(id)
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCountry(
    @Param('id') id: string,
    @Body() createCountryDto: CreateCountryDto,
  ) {
    const result = await this.countriesService.updateCountry(
      id,
      createCountryDto,
    )
    return {
      data: result,
    }
  }
}
