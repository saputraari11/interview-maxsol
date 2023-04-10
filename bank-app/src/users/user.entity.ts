import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Country } from '../countries/country.entity'
import { BankUser } from '../bank-users/bank-user.entity'
import { UserLevel } from './user-level.enum'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  first_name: string

  @Column({ nullable: true })
  last_name: string

  @Column({ unique: true, nullable: true })
  user_name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  level: UserLevel

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

  @ManyToOne(
    type => Country,
    country => country.users,
  )
  @JoinColumn({ name: 'country_id' })
  country: Country

  @OneToMany(
    type => BankUser,
    bank_user => bank_user.user,
  )
  bank_users: BankUser[]

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}
