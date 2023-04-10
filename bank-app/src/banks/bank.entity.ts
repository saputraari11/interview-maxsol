import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm'
import { BankUser } from '../bank-users/bank-user.entity'

@Entity()
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  bank_name: string

  @Column()
  bank_code?: string

  @Column()
  bank_type: 'bank' | 'credit_card' = 'bank'

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    default: () => null,
  })
  deleted_at: Date

  @OneToMany(
    type => BankUser,
    bank_user => bank_user.bank,
  )
  bank_users: BankUser[]
}
