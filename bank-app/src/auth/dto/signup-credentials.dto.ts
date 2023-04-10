import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator'
import { UserLevel } from 'src/users/user-level.enum'

export class SignupCredentialsDto {
  first_name?: string

  last_name?: string

  user_name?: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'password to weak',
  })
  password: string

  level?: UserLevel
}
