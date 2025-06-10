import type {
  User as PayloadGeneratedUser,
  Category as PayloadGeneratedCategory,
  Media as PayloadGeneratedMedia,
  Post as PayloadGeneratedPost,
  Page as PayloadGeneratedPage,
} from './payload-types'
import type { PayloadRequest } from 'payload'

// --- Definición de Validacion para el admin ---
interface ValidationOptions {
  value: unknown
  operation?: 'create' | 'update' | 'read' | 'delete'
  req?: PayloadRequest
  data?: Record<string, unknown>
  siblingData?: Record<string, unknown>
  path?: string
  field?: unknown
  user?: unknown
}

export type ValidationFunction = (
  options: ValidationOptions,
) => true | string | Promise<true | string>

// --- Tipos para la Colección de Usuarios ---
export type UserRole = 'admin' | 'editor'

export interface User extends PayloadGeneratedUser {
  roles?: UserRole[]
}

// --- Tipos para la Colección de Categorías ---
export type Category = PayloadGeneratedCategory

// --- Tipos para la Colección de Multimedia ---
export type Media = PayloadGeneratedMedia

// --- Tipos para la Colección de Entradas de Blog (Posts) ---
export type PostStatus = 'draft' | 'published' | 'archived'

export type Post = PayloadGeneratedPost

// --- Tipos para los Bloques Flexibles (Content Blocks) ---
export interface ContentBlock {
  blockType: string
  blockName?: string
}

// 1. Bloque: Texto con Imagen (alternado)
export interface ImageTextBlock extends ContentBlock {
  blockType: 'imageTextBlock'
  heading: string
  content: PayloadGeneratedPost['content'] // Reutiliza el tipo de richText del Post generado
  image: string | Media
  imagePosition: 'left' | 'right'
}

// 2. Bloque: Llamada a la Acción (CTA)
export interface CTABlock extends ContentBlock {
  blockType: 'ctaBlock'
  heading: string
  description: string
  buttonText: string
  buttonLink: string
}

// 3. Bloque: Contenido Enriquecido Simple
export interface RichContentBlock extends ContentBlock {
  blockType: 'richContentBlock'
  content: PayloadGeneratedPost['content'] // Reutiliza el tipo de richText del Post generado
}

// Codigo para el array de bloques.
export type PageLayoutBlock = ImageTextBlock | CTABlock | RichContentBlock

// --- Tipo para la Colección Pages ---
export interface Page extends PayloadGeneratedPage {
  layout: PageLayoutBlock[]
  meta?: {
    title?: string
    description?: string
    keywords?: string
  }
}

export type {
  PayloadGeneratedUser,
  PayloadGeneratedCategory,
  PayloadGeneratedMedia,
  PayloadGeneratedPost,
  PayloadGeneratedPage,
}
