import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  code: string
}
