import { isAdmin, anyone } from '../access/isAdmin'
/* import detailSideMedia from '../assets/detail_side_media.png'
import banner from '../assets/banner.png'
import explorer from '../assets/explorer.png'
import carouselThreeColumns from '../assets/carousel_three_columns.png'
import carouselTwoColumns from '../assets/carousel_two_columns.png'
import twoColumns from '../assets/two_columns.png' */
import { GlobalConfig } from 'payload'

const Paginas: GlobalConfig = {
  slug: 'paginas',
  admin: {
    group: 'Configuración',
  },
  access: {
    read: anyone,
    readDrafts: isAdmin,
    readVersions: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'inicio',
          label: 'Inicio',
          fields: [
            {
              name: 'meta',
              label: 'SEO',
              type: 'group',
              admin: {
                position: 'sidebar',
              },
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
            {
              name: 'inicio',
              label: 'Inicio',
              type: 'array',
              minRows: 1,
              maxRows: 1,
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Título de la sección de inicio',
                  required: true,
                },
                {
                  name: 'articulo',
                  type: 'array',
                  label: 'Articulo seleccionado',
                  maxRows: 1,
                  minRows: 1,
                  fields: [
                    {
                      name: 'post',
                      type: 'relationship',
                      relationTo: 'articulos',
                      required: true,
                      label: 'Articulo',
                    },
                  ],
                  admin: {
                    description: 'Selecciona los articulos que deseas mostrar en este bloque.',
                  },
                },
              ],
            },
            {
              type: 'group',
              label: 'Contenido',
              fields: [
                {
                  name: 'contenido',
                  type: 'blocks',
                  blocks: [
                    // 1. Bloque: Detalle con media lateral
                    {
                      slug: 'detailSideMediaBlock',
                      labels: {
                        singular: 'Detalle con media lateral',
                        plural: 'Detalles con media lateral',
                      },
                      /* imageURL: detailSideMedia.src, */
                      fields: [
                        {
                          name: 'heading',
                          type: 'text',
                          label: 'Título',
                          required: true,
                        },
                        {
                          name: 'articulo',
                          type: 'array',
                          label: 'Articulo seleccionado',
                          maxRows: 2,
                          minRows: 2,
                          fields: [
                            {
                              name: 'post',
                              type: 'relationship',
                              relationTo: 'articulos',
                              required: true,
                              label: 'Articulo',
                            },
                          ],
                          admin: {
                            description:
                              'Selecciona los articulos que deseas mostrar en este bloque.',
                          },
                        },
                      ],
                    },
                    // 2. Bloque: Banner ancho completo
                    {
                      slug: 'bannerBlock',
                      /* imageURL: banner.src, */
                      labels: {
                        singular: 'Banner',
                        plural: 'Banner',
                      },
                      fields: [
                        {
                          name: 'articulo',
                          type: 'array',
                          label: 'Articulo seleccionado',
                          maxRows: 1,
                          minRows: 1,
                          fields: [
                            {
                              name: 'post',
                              type: 'relationship',
                              relationTo: 'articulos',
                              required: true,
                              label: 'Articulo',
                            },
                          ],
                          admin: {
                            description:
                              'Selecciona los articulos que deseas mostrar en este bloque.',
                          },
                        },
                      ],
                    },
                    // 3. Bloque: Explorar
                    {
                      slug: 'exploreBlock',
                      /* imageURL: explorer.src, */
                      labels: {
                        singular: 'Explorar',
                        plural: 'Explorar',
                      },
                      fields: [
                        {
                          name: 'articulo',
                          type: 'array',
                          label: 'Articulos seleccionados',
                          maxRows: 6,
                          minRows: 6,
                          fields: [
                            {
                              name: 'post',
                              type: 'relationship',
                              relationTo: 'articulos',
                              required: true,
                              label: 'Articulo',
                            },
                          ],
                          admin: {
                            description:
                              'Selecciona los articulos que deseas mostrar en este bloque.',
                          },
                        },
                      ],
                    },

                    // 4. Bloque: Carousel tres columnas
                    {
                      slug: 'carouselThreeColumns',
                      /* imageURL: carouselThreeColumns.src, */
                      labels: {
                        singular: 'Carousel tres columnas',
                        plural: 'Carousel tres columnas',
                      },
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          label: 'Título',
                          required: true,
                        },
                        {
                          name: 'articulo',
                          type: 'array',
                          label: 'Articulo seleccionado',
                          maxRows: 6,
                          minRows: 6,
                          fields: [
                            {
                              name: 'post',
                              type: 'relationship',
                              relationTo: 'articulos',
                              required: true,
                              label: 'Articulo',
                            },
                          ],
                          admin: {
                            description:
                              'Selecciona los articulos que deseas mostrar en este bloque.',
                          },
                        },
                      ],
                    },
                    // 5. Bloque: Carousel dos columnas
                    {
                      slug: 'carouselTwoColumns',
                      /* imageURL: carouselTwoColumns.src, */
                      labels: {
                        singular: 'Carousel dos columnas',
                        plural: 'Carousel dos columnas',
                      },
                      fields: [
                        {
                          name: 'title',
                          type: 'text',
                          label: 'Título',
                          required: true,
                        },
                        {
                          name: 'articulo',
                          type: 'array',
                          label: 'Articulo seleccionado',
                          maxRows: 6,
                          minRows: 6,
                          fields: [
                            {
                              name: 'post',
                              type: 'relationship',
                              relationTo: 'articulos',
                              required: true,
                              label: 'Articulo',
                            },
                          ],
                          admin: {
                            description:
                              'Selecciona los articulos que deseas mostrar en este bloque.',
                          },
                        },
                      ],
                    },
                    // 6. Bloque: Carousel dos columnas
                    {
                      slug: 'TwoColumns',
                      /* imageURL: twoColumns.src, */
                      labels: {
                        singular: 'Dos columnas',
                        plural: 'Dos columnas',
                      },
                      fields: [
                        {
                          name: 'articulo',
                          type: 'array',
                          label: 'Articulo seleccionado',
                          maxRows: 2,
                          minRows: 2,
                          fields: [
                            {
                              name: 'post',
                              type: 'relationship',
                              relationTo: 'articulos',
                              required: true,
                              label: 'Articulo',
                            },
                          ],
                          admin: {
                            description:
                              'Selecciona los articulos que deseas mostrar en este bloque.',
                          },
                        },
                      ],
                    },
                  ],
                  minRows: 0, // Mínimo de bloques
                  maxRows: undefined, // Sin límite máximo de bloques
                },
              ],
            },
            {
              name: 'cierre',
              label: 'Cierre',
              type: 'array',
              minRows: 1,
              maxRows: 1,
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  name: 'articulo',
                  type: 'array',
                  label: 'Articulo seleccionado',
                  maxRows: 7,
                  minRows: 7,
                  fields: [
                    {
                      name: 'post',
                      type: 'relationship',
                      relationTo: 'articulos',
                      required: true,
                      label: 'Articulo',
                    },
                  ],
                  admin: {
                    description: 'Selecciona los articulos que deseas mostrar en este bloque.',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'acerca',
          label: 'Acerca de',
          fields: [
            {
              name: 'introduction',
              type: 'textarea',
              label: 'Ingresa texto de introducción:',
            },
            {
              name: 'biography',
              type: 'textarea',
              label: 'Ingresa tu biografía:',
            },
            {
              name: 'phrase',
              type: 'text',
              label: 'Ingresa tu frase:',
            },
            {
              name: 'imageOne',
              type: 'upload',
              relationTo: 'archivos', // Relación con la colección 'media'
              label: 'Imagen número 1',
              required: true,
            },
            {
              name: 'imageTwo',
              type: 'upload',
              relationTo: 'archivos', // Relación con la colección 'media'
              label: 'Imagen número 2',
              required: true,
            },
            {
              name: 'imageThree',
              type: 'upload',
              relationTo: 'archivos', // Relación con la colección 'media'
              label: 'Imagen número 3',
              required: true,
            },
            {
              name: 'imageFour',
              type: 'upload',
              relationTo: 'archivos', // Relación con la colección 'media'
              label: 'Imagen número 4',
              required: true,
            },
            {
              name: 'social',
              type: 'group',
              label: 'Redes sociales',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  label: 'Ingresa tu correo electrónico:',
                },
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Ingresa tu enlace para Facebook:',
                },
                {
                  name: 'youtube',
                  type: 'text',
                  label: 'Ingresa tu enlace para YouTube:',
                },
                {
                  name: 'tiktok',
                  type: 'text',
                  label: 'Ingresa tu enlace para TikTok:',
                },
                {
                  name: 'twitter',
                  type: 'text',
                  label: 'Ingresa tu enlace para Twitter:',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Paginas
