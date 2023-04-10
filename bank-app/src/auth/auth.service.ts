import { ConflictException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserLevel } from 'src/users/user-level.enum'
import { UserRepository } from 'src/users/user.repository'
import { User } from '../users/user.entity'
import { SignupCredentialsDto } from './dto/signup-credentials.dto'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  generateToken(user: User) {
    const payload: JwtPayload = {
      user_name: user.user_name,
      email: user.email,
      level: user.level,
      uuid: user.id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async signUp(
    userRegister: SignupCredentialsDto,
    level: UserLevel = UserLevel.ADMIN,
  ): Promise<User> {
    const userExist = await User.findOne({
      where: { email: userRegister.email },
    })
    if (userExist) {
      throw new ConflictException('User is Already Exist!')
    }

    userRegister.level = level

    const user = this.userRepository.signup(userRegister)

    return user
  }

  async validate(username: string, password: string) {
    const user = await User.getRepository()
      .createQueryBuilder('user')
      .where('user.email = :email', {
        email: username,
      })
      .getOne()

    if (user && (await user.validatePassword(password))) {
      return user
    } else {
      return null
    }
  }
}
