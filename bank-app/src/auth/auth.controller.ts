import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserLevel } from 'src/users/user-level.enum'
import { SETTINGS } from '../app.utils'
import { User } from '../users/user.entity'
import { AuthService } from './auth.service'
import { SignupCredentialsDto } from './dto/signup-credentials.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signin(@Request() req) {
    return this.authService.generateToken(req.user)
  }

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Created user object as response',
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async signUp(
    @Body(SETTINGS.VALIDATION_PIPE)
    signUpCredentialsDto: SignupCredentialsDto,
  ): Promise<User> {
    return await this.authService.signUp(signUpCredentialsDto)
  }

  @Post('signup-user')
  @ApiCreatedResponse({
    description: 'Created user object as response',
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async signUpUser(
    @Body(SETTINGS.VALIDATION_PIPE)
    signUpCredentialsDto: SignupCredentialsDto,
  ): Promise<User> {
    return await this.authService.signUp(signUpCredentialsDto, UserLevel.USER)
  }
}
