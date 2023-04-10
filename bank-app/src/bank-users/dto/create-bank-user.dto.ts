import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateBankUserDto {
  @IsString()
  @IsNotEmpty()
  bank_id: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsString()
  @IsNotEmpty()
  fullname: string

  @IsString()
  @IsNotEmpty()
  account_number: string

  @IsString()
  @IsOptional()
  cvv?: string

  @IsString()
  @IsOptional()
  exp_month?: string

  @IsString()
  @IsOptional()
  exp_year?: string

  @IsString()
  @IsOptional()
  billing_zip_code?: string

  @IsString()
  @IsOptional()
  address?: string
}
