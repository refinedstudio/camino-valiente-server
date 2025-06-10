import type { CollectionConfig } from 'payload'
import { isAdmin, anyone } from '../access/isAdmin'

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: './uploads',
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 480, position: 'centre' },
    ],
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Contenido',
  },
  access: {
    read: anyone, // Todos pueden leer los archivos multimedia
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto Alternativo (Alt Text)',
    },
  ],
}

export default Media
