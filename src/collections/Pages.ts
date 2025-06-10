import type { CollectionConfig } from 'payload'
import { isAdmin, anyone } from '../access/isAdmin'
import { richText } from '../fields/richText'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Contenido del Sitio',
    description: 'Gestiona las páginas estáticas y su contenido flexible.',
  },
  access: {
    read: anyone, // Las páginas son públicas
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título de la Página',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      label: 'Slug de la URL',
      admin: {
        position: 'sidebar',
        description: 'La parte de la URL para esta página (ej: "acerca-de", "servicios").',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      labels: {
        singular: 'Bloque de Contenido',
        plural: 'Bloques de Contenido',
      },
      blocks: [
        {
          slug: 'imageTextBlock',
          labels: {
            singular: 'Bloque: Imagen y Texto',
            plural: 'Bloques: Imagen y Texto',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Título',
              required: true,
            },
            richText,
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Imagen',
            },
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'Izquierda', value: 'left' },
                { label: 'Derecha', value: 'right' },
              ],
              defaultValue: 'left',
              label: 'Posición de la Imagen',
              required: true,
            },
          ],
        },
        // 2. Bloque: Llamada a la Acción (CTA)
        {
          slug: 'ctaBlock',
          labels: {
            singular: 'Bloque: Llamada a la Acción',
            plural: 'Bloques: Llamada a la Acción',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Título de CTA',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descripción de CTA',
              required: true,
            },
            {
              name: 'buttonText',
              type: 'text',
              label: 'Texto del Botón',
              required: true,
            },
            {
              name: 'buttonLink',
              type: 'text',
              label: 'Enlace del Botón',
              required: true,
              admin: {
                description: 'URL a donde dirigirá el botón (ej: /contacto, https://ejemplo.com)',
              },
            },
          ],
        },
        // 3. Bloque: Contenido Enriquecido Simple (para secciones de texto grandes)
        {
          slug: 'richContentBlock',
          labels: {
            singular: 'Bloque: Contenido Enriquecido',
            plural: 'Bloques: Contenido Enriquecido',
          },
          fields: [richText],
        },
      ],
      minRows: 0, // Mínimo de bloques
      maxRows: undefined, // Sin límite máximo de bloques
    },
    {
      name: 'meta',
      label: 'Meta SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Título',
          admin: {
            description: 'Título para el navegador y motores de búsqueda.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Descripción',
          admin: {
            description: 'Breve resumen para los motores de búsqueda.',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Palabras Clave (SEO)',
          admin: {
            description: 'Palabras clave separadas por comas.',
          },
        },
      ],
    },
  ],
}

export default Pages
