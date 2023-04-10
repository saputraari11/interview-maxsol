import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm'
import { User } from '../users/user.entity'
import { Bank } from '../banks/bank.entity'

@Entity()
export class BankUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'uuid' })
  bank_id: string

  @Column({ type: 'uuid' })
  user_id: string

  @Column({ nullable: true })
  fullname: string

  @Column()
  account_number: string

  @Column({ nullable: true })
  cvv?: string

  @Column({ nullable: true })
  exp_month?: string

  @Column({ nullable: true })
  exp_year?: string

  @Column({ nullable: true })
  billing_zip_code?: string

  @Column({ nullable: true })
  address: string

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

  @ManyToOne(
    type => User,
    user => user.bank_users,
  )
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(
    type => Bank,
    bank => bank.bank_users,
  )
  @JoinColumn({ name: 'bank_id' })
  bank: Bank
}
