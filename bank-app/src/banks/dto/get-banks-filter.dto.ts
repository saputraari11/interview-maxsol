import { IsOptional, IsNotEmpty } from 'class-validator'

export class GetBanksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  queryFilter: string
}
