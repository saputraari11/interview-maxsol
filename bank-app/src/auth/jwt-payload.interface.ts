import { UserLevel } from '../users/user-level.enum'

export interface JwtPayload {
  user_name: string
  email: string
  level: UserLevel
  uuid: string
}
