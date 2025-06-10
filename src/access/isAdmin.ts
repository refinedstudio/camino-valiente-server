import type { Access, AccessArgs } from 'payload'
import type { User } from '../types'

export const isAdmin: Access = ({ req: { user } }: AccessArgs) => {
  return Boolean((user as User)?.roles?.includes('admin'))
}

export const anyone: Access = () => true
