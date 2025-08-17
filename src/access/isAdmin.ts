import type { Access, AccessArgs } from 'payload'

export const isAdmin: Access = ({ req: { user } }: AccessArgs) => {
  return Boolean((user as any)?.roles?.includes('admin'))
}

export const anyone: Access = () => true
