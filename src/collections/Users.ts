import type { CollectionConfig, FieldAccess } from 'payload'
import type { User } from '../types'
import { isAdmin } from '../access/isAdmin'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles'],
    group: 'Admin',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        read: isAdmin as FieldAccess<User, User>,
        create: isAdmin as FieldAccess<User, User>,
        update: isAdmin as FieldAccess<User, User>,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const users = await req.payload.find({
          collection: 'users',
          depth: 0,
          limit: 1,
        })
        if (users.docs.length === 0 && !(doc as User).roles?.includes('admin')) {
          await req.payload.update({
            collection: 'users',
            id: doc.id,
            data: { roles: ['admin'] as User['roles'] },
          })
          req.payload.logger.info(`Primer usuario ${doc.email} establecido como admin.`)
        }
      },
    ],
  },
}

export default Users
