import { IsNotEmpty, IsString, IsEnum } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  last_name: string

  @IsString()
  @IsNotEmpty()
  country_id: string
}
