import { Repository, EntityRepository } from 'typeorm'
import { Bank } from './bank.entity'

@EntityRepository(Bank)
export class BankRepository extends Repository<Bank> {
  async getBanks(queryFilter: string) {
    const query = Bank.createQueryBuilder('bank')

    if (queryFilter) {
      query.where('LOWER(bank.bank_name) LIKE LOWER(:search)', {
        search: `%${queryFilter}%`,
      })
      query.orWhere('LOWER(bank.bank_code) LIKE LOWER(:search)', {
        search: `%${queryFilter}%`,
      })
    }
    query.andWhere('bank.deleted_at IS NULL')

    const bank = await query.getMany()
    const count = await query.getCount()

    return {
      bank,
      count,
    }
  }
}
