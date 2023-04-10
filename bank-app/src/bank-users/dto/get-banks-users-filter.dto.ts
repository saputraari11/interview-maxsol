import { IsOptional, IsNotEmpty } from 'class-validator'

export class GetBanksUsersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  user_id: string
}
