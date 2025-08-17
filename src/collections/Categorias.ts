import type { CollectionConfig } from 'payload'
import { isAdmin, anyone } from '../access/isAdmin'
import { generateSlug } from '../hooks/generateSlug'

const Categorias: CollectionConfig = {
  slug: 'categorias',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Contenido',
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título de la Categoría',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: false,
      },
      hooks: {
        beforeChange: [generateSlug],
      },
    },
  ],
}

export default Categorias
