import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'
import { REGEX } from '../../app.utils'

export class SignInDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'reachme@amitavroy.com',
  })
  @IsEmail()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: 'Password in plain text',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Matches(REGEX.PASSWORD_RULE)
  password: string
}
