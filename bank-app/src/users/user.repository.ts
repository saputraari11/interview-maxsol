import { Repository, EntityRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'
import { SignupCredentialsDto } from '../auth/dto/signup-credentials.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signupCredentialsDto: SignupCredentialsDto): Promise<User> {
    const {
      first_name,
      last_name,
      user_name,
      password,
      email,
      level,
    } = signupCredentialsDto

    const user = new User()
    if (first_name) user.first_name = first_name
    if (last_name) user.last_name = last_name
    if (user_name) user.user_name = user_name
    user.email = email
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    user.level = level
    const savedUser = await user.save()

    return savedUser
  }

  async validateUserPassword(
    user_name: string,
    password: string,
  ): Promise<User> {
    const user = await User.getRepository()
      .createQueryBuilder('user')
      .where('user.user_name = :user_name OR user.email = :user_name', {
        user_name: user_name,
      })
      .getOne()

    if (user && (await user.validatePassword(password))) {
      return user
    } else {
      return null
    }
  }

  public async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }
}
