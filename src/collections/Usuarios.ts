import type { CollectionConfig, FieldAccess } from 'payload'
import { isAdmin } from '../access/isAdmin'

const Usuarios: CollectionConfig = {
  slug: 'usuarios',
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
        read: isAdmin as FieldAccess<any, any>,
        create: isAdmin as FieldAccess<any, any>,
        update: isAdmin as FieldAccess<any, any>,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const users = await req.payload.find({
          collection: 'usuarios',
          depth: 0,
          limit: 1,
        })
        if (users.docs.length === 0 && !(doc as any).roles?.includes('admin')) {
          await req.payload.update({
            collection: 'usuarios',
            id: doc.id,
            data: { roles: ['admin'] as any },
          })
          req.payload.logger.info(`Primer usuario ${doc.email} establecido como admin.`)
        }
      },
    ],
  },
}

export default Usuarios
