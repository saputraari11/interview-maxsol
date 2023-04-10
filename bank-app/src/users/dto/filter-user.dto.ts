import { IsOptional, IsEnum } from 'class-validator'
import { UserLevel } from '../user-level.enum'

export class FilterUserDto {
  @IsOptional()
  name: string

  @IsOptional()
  email: string

  @IsOptional()
  level: UserLevel

  @IsOptional()
  dob: string

  @IsOptional()
  phone: number

  @IsOptional()
  page: number

  @IsOptional()
  limit: number
}
