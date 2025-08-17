import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import Usuarios from './collections/Usuarios'
import Archivos from './collections/Archivos'
import Categorias from './collections/Categorias'
import Articulos from './collections/Articulos'
import Paginas from './collections/Paginas'
import { es } from 'payload/i18n/es'
import { en } from 'payload/i18n/en'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: { es, en },
  },
  admin: {
    user: Usuarios.slug,
  },
  collections: [Usuarios, Archivos, Categorias, Articulos] as const,
  globals: [Paginas],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin(),


  s3Storage({
    bucket: process.env.S3_BUCKET!, // 'caminovaliente-aws-test'
    config: {
      region: process.env.S3_REGION!, // 'us-east-1'
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    },
    acl: 'public-read',           // hace accesible la URL públicamente
    disableLocalStorage: true,    // evita guardar en local
    collections: {
      archivos: {
        prefix: 'public',          // carpeta dentro del bucket
        signedDownloads: false,    // no usamos URLs pre-firmadas
      },
    },
  }),

  ],
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
})
