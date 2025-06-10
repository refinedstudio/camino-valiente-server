import type { Field } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const richText: Field = {
  name: 'content',
  type: 'richText',
  label: 'Contenido',
  required: true,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),
  admin: {
    description: 'Contenido principal del blog post con formato y multimedia.',
  },
}
