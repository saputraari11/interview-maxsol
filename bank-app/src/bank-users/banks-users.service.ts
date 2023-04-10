import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BankUserRepository } from './bank-user.repository'
import { BankUser } from './bank-user.entity'
import { getRepository } from 'typeorm'

@Injectable()
export class BanksUsersService {
  constructor(
    @InjectRepository(BankUserRepository)
    private bankUserRepository: BankUserRepository,
  ) {}

  async getBankUsers(user_id: string) {
    const query = await getRepository(BankUser)
      .createQueryBuilder('bank_user')
      .leftJoinAndSelect('bank_user.bank', 'bank')
      .where('bank_user.user_id = :user_id', { user_id })
      .andWhere('bank_user.deleted_at IS NULL')

    return await query.getManyAndCount()
  }

  async getBankUserById(id: string): Promise<BankUser> {
    const bankUser = await getRepository(BankUser)
      .createQueryBuilder('bank_user')
      .leftJoinAndSelect('bank_user.bank', 'bank')
      .where('bank_user.id = :id', { id })
      .andWhere('bank_user.deleted_at IS NULL')
      .getOne()

    if (!bankUser) {
      null
    }

    return bankUser
  }

  async createBankUser(bank: BankUser): Promise<BankUser> {
    await this.bankUserRepository.save(bank)

    return bank
  }

  async deleteBankUser(id: string): Promise<void> {
    const bank: BankUser = await this.bankUserRepository.findOne(id)

    if (!bank) {
      throw Error(`Bank user account couldn't be found!`)
    }

    bank.deleted_at = new Date()
    await bank.save()
  }

  async getBankUserByUserId(id: string): Promise<BankUser[]> {
    const bankUser = await getRepository(BankUser)
      .createQueryBuilder('bank_user')
      .leftJoinAndSelect('bank_user.bank', 'bank')
      .where('bank_user.user_id = :id', { id })
      .andWhere('bank_user.deleted_at IS NULL')
      .getMany()

    if (!bankUser) {
      null
    }

    return bankUser
  }
}
