import type { CollectionConfig } from 'payload'
import { isAdmin, anyone } from '../access/isAdmin'


const Archivos: CollectionConfig = {
  slug: 'archivos',
  upload: {
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Contenido',
  },
  access: {
    read: anyone, // Todos pueden leer (o controla con permisos)
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      label: 'Texto Alternativo (Alt Text)',
    },
  ],
}

export default Archivos
