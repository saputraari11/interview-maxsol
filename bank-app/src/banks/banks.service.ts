import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BankRepository } from './bank.repository'
import { Bank } from './bank.entity'
import { CreateBankDto } from './dto/create-bank.dto'

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(BankRepository)
    private bankRepository: BankRepository,
  ) {}

  async getBanks(query: string) {
    return this.bankRepository.getBanks(query)
  }

  async getBankById(id: string): Promise<Bank> {
    const bank = await this.bankRepository.findOne(id)
    if (!bank) {
      throw new NotFoundException(`Bank with ID "${id}" not found`)
    }
    return bank
  }

  async createBank(bank: Bank): Promise<Bank> {
    await this.bankRepository.save(bank)

    return bank
  }

  async updateBank(id: string, createCountryDto: CreateBankDto): Promise<Bank> {
    const { bank_name, bank_code, bank_type } = createCountryDto as Bank
    const bankEntity = await this.getBankById(id)
    bankEntity.bank_name = bank_name
    bankEntity.bank_code = bank_code
    bankEntity.bank_type = bank_type
    await bankEntity.save()

    return bankEntity
  }

  async deleteBank(id: string): Promise<void> {
    const bank = await this.bankRepository.findOne(id)

    if (!bank) {
      throw Error(`Bank account couldn't be found!`)
    }

    bank.deleted_at = new Date()
    await bank.save()
  }
}
