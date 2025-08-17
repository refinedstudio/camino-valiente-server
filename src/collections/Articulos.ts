import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { generateSlug } from '../hooks/generateSlug'
import { richText } from '../fields/richText'

const Articulos: CollectionConfig = {
  slug: 'articulos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'category', 'updatedAt'],
    group: 'Contenido',
    livePreview: {
      url: ({ data }) => {
        return `${process.env.PAYLOAD_PUBLIC_FRONTEND_URL}/blog/preview?id=${data.id}`
      },
    },
  },
  access: {
    create: isAdmin, // Solo admin puede crear posts
    update: isAdmin, // Solo admin puede actualizar posts
    delete: isAdmin, // Solo admin puede eliminar posts
    read: ({ req }) => {
      // Si el usuario es admin, puede leer todos los posts (borradores, archivados, publicados)
      if (isAdmin({ req })) {
        return true
      }
      // Si no es admin, solo puede leer posts cuyo status sea 'published'
      return {
        status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título del artículo',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'Subtítulo del artículo',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: false, // Permitir edición manual si es necesario
      },
      hooks: {
        beforeChange: [generateSlug], // Genera el slug automáticamente al crear o si está vacío
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categorias', // Relación con la colección 'categories'
      required: true,
      label: 'Categoría',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Contenido del artículo',
      required: true,
    },
    {
      name: 'imagenes',
      type: 'array',
      label: 'Imágenes del artículo',
      maxRows: 16,
      minRows: 4,
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          relationTo: 'archivos',
          label: 'Imagen',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Archivado', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
        description: 'Cambia el estado del post para publicarlo o guardarlo como borrador.',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Fecha de Publicación',
      admin: {
        position: 'sidebar',
        description:
          'La fecha en que el post fue publicado (se establece automáticamente al publicar).',

        condition: (data: Record<string, unknown>) => {
          const postData = data as any
          return postData && typeof postData.status === 'string' && postData.status === 'published'
        },
      },
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            const postData = data as any
            if (postData.status === 'published' && !value) {
              return new Date().toISOString()
            }
            if (postData.status !== 'published') {
              return null
            }
            return value
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'usuarios', // Relación con la colección 'users'
      defaultValue: ({ user }) => user?.id, // Asigna automáticamente el usuario logueado como autor
      admin: {
        position: 'sidebar',
        readOnly: true, // El autor se asigna automáticamente y no se puede cambiar en el admin
        hidden: true, // Opcional: oculta este campo si no quieres que el admin lo vea
      },
    },
  ],
  // Hook para eliminar referencias de media al borrar un post (avanzado)
  hooks: {
    afterDelete: [async ({ }) => { }],
  },
}

export default Articulos
