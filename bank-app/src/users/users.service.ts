import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CountryRepository } from 'src/countries/country.repository'
import { getRepository, Not } from 'typeorm'
import { FilterUserDto } from './dto/filter-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(CountryRepository)
    private countryRepository: CountryRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUsers(filterDto: FilterUserDto) {
    const query = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.country', 'country')
    const { name, email, level, page, limit } = filterDto

    if (name) {
      query.andWhere(
        'LOWER(user.first_name) LIKE LOWER(:name) OR LOWER(user.last_name) LIKE LOWER(:name) OR LOWER(user.email) LIKE LOWER(:name)',
        {
          name: `%${name}%`,
        },
      )
    }

    if (email) {
      query.andWhere('LOWER(user.email) LIKE LOWER(:email)', {
        email: `%${email}%`,
      })
    }

    if (level) {
      query.andWhere('user.level = :level', { level })
    }

    query.orderBy('user.created_at', 'DESC')

    if (page && limit) {
      query.skip((page - 1) * limit).take(limit)
    }

    const [results, total] = await query.getManyAndCount()

    const users = {
      data: results,
      limit,
      page,
      total,
      count: results.length,
    }

    return users
  }

  async getUserById(id: string): Promise<User> {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.country', 'country')
      .getOne()
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }

    return user
  }

  async updateUser(id: string, updatedUser: UpdateUserDto) {
    const user = await this.getUserById(id)
    const country = await this.countryRepository.findOne(updatedUser.country_id)

    user.first_name = updatedUser.first_name
    user.last_name = updatedUser.last_name
    user.country = country

    if (await user.save()) {
      return user
    }

    throw new Error('User cannot be saved.')
  }
  async changeUsername(id: string, username: string) {
    const isExists = await this.userRepository.findOne({
      where: {
        user_name: username,
        id: Not(id),
      },
    })

    if (isExists) {
      throw new Error('The username is already used, please try another one.')
    }

    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new Error('Invalid user data!')
    }

    user.user_name = username
    await user.save()

    return user
  }

  async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne(userId)
      if (!user) return false

      if (await user.validatePassword(oldPassword)) {
        user.password = await this.userRepository.hashPassword(
          newPassword,
          user.salt,
        )
        if (await user.save()) {
          return true
        }
        return false
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
}
