import { Repository, EntityRepository } from 'typeorm'
import { BankUser } from './bank-user.entity'

@EntityRepository(BankUser)
export class BankUserRepository extends Repository<BankUser> {
  async getBankUsers(user_id: string) {
    const query = this.createQueryBuilder('bank_user')

    if (user_id) {
      query.where('bank_user.user_id = :user_id', {
        user_id,
      })
    }

    const bank = await query.getMany()
    const count = await query.getCount()

    return {
      bank,
      count,
    }
  }

  async getBankUser(bank_id: string, user_id: string) {
    const query = this.createQueryBuilder('bank_user')

    if (bank_id && user_id) {
      query.where('bank_user.user_id = :user_id', {
        user_id,
      })
      query.andWhere('bank_user.bank_id = :bank_id', {
        bank_id,
      })
    }

    return query.getOne()
  }
}
