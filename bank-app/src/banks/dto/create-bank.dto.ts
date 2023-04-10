import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  bank_name: string

  @IsString()
  @IsNotEmpty()
  bank_code: string

  @IsString()
  @IsNotEmpty()
  bank_type: 'bank' | 'credit_card'
}
