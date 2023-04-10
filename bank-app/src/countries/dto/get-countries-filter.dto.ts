import { IsOptional } from 'class-validator'

export class GetCountriesFilterDto {
  @IsOptional()
  name: string

  @IsOptional()
  page: number

  @IsOptional()
  limit: number
}
