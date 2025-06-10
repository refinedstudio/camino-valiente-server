import type { ValidationFunction } from '../types'

import type { CollectionSlug, Where, PayloadRequest } from 'payload'

// --- Interfaces Auxiliares para el Contenido Rich Text (Lexical) ---
interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[] // Los nodos pueden tener hijos
  format?: number
  indent?: number
}

interface LexicalRootNode {
  type: string
  children: LexicalNode[]
  direction: 'ltr' | 'rtl' | null
  format: string
  indent: number
  version: number
}

// --- Interfaces para tipado de consultas ---
interface WhereField {
  equals?: string | number
  not_equals?: string | number
  in?: (string | number)[]
  not_in?: (string | number)[]
  exists?: boolean
}

interface LexicalContent {
  root: LexicalRootNode
}

// --- Funciones de Validación ---

/**
 * Valida que un email tenga formato correcto
 */
export const validateEmail: ValidationFunction = ({ value }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!value) {
    return 'El email es requerido'
  }

  if (typeof value !== 'string' || !emailRegex.test(value)) {
    return 'Por favor ingresa un email válido'
  }

  return true
}

/**
 * Valida que una contraseña tenga la longitud mínima
 */
export const validatePassword: ValidationFunction = ({ value, operation }) => {
  if (operation === 'update' && !value) {
    return true
  }

  if (!value) {
    return 'La contraseña es requerida'
  }

  if (typeof value !== 'string' || value.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres'
  }

  return true
}

/**
 * Valida que el título del post no esté vacío y tenga longitud adecuada
 */
export const validatePostTitle: ValidationFunction = ({ value }) => {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return 'El título es requerido'
  }

  if (value.length < 5) {
    return 'El título debe tener al menos 5 caracteres'
  }

  if (value.length > 200) {
    return 'El título no puede exceder 200 caracteres'
  }

  return true
}

/**
 * Valida que el contenido del post no esté vacío (para campos richText de Lexical)
 */
export const validatePostContent: ValidationFunction = ({ value }) => {
  const isLexicalContent = (val: unknown): val is LexicalContent => {
    return (
      val !== null &&
      typeof val === 'object' &&
      'root' in val &&
      val.root !== null &&
      typeof val.root === 'object' &&
      'children' in val.root &&
      Array.isArray(val.root.children)
    )
  }

  if (!isLexicalContent(value)) {
    return 'El contenido es requerido'
  }

  const lexicalRoot = value.root

  // Verifica si el contenido no esta vacio
  const hasContent = lexicalRoot.children.some((node: LexicalNode) => {
    if (node.type === 'paragraph' && node.children) {
      // Si es un párrafo, verifica que sus hijos (elementos de texto) tengan contenido
      return node.children.some((child: LexicalNode) => child.text && child.text.trim().length > 0)
    }
    return node.text && node.text.trim().length > 0
  })

  if (!hasContent) {
    return 'El contenido no puede estar vacío'
  }

  return true
}

/**
 * Valida URLs de videos embebidos (para el campo 'embeddedVideos')
 */
export const validateVideoUrl: ValidationFunction = ({ value }) => {
  if (!value) {
    return true // Si el campo no es requerido, se permite valor vacío
  }

  if (typeof value !== 'string') {
    return 'La URL debe ser una cadena de texto.'
  }

  const urlRegex = /^https?:\/\/.+/
  if (!urlRegex.test(value)) {
    return 'Por favor ingresa una URL válida.'
  }

  const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/
  const vimeoRegex = /^https?:\/\/(www\.)?vimeo\.com\/.+$/

  if (!youtubeRegex.test(value) && !vimeoRegex.test(value)) {
    return 'URL debe ser de YouTube o Vimeo.'
  }

  return true
}

/**
 * Valida que el slug sea único dentro de una colección.
 * Esta función es un validador personalizado para el campo 'slug'.
 * No es de tipo ValidationFunction porque toma parámetros ligeramente diferentes.
 */
export const validateUniqueSlug = async (
  slug: string,
  collection: CollectionSlug,
  id?: string,
  req?: PayloadRequest,
) => {
  if (!req || !req.payload) {
    throw new Error('Payload request object is missing.')
  }

  const query: Where = {
    slug: { equals: slug },
  }

  // Añade la condición para excluir el propio documento en caso de actualización
  if (id) {
    ;(query as Where & { id: WhereField }).id = { not_equals: id }
  }

  // Realiza la búsqueda en la base de datos de Payload
  const existingDocs = await req.payload.find({
    collection: collection,
    where: query,
    limit: 1,
  })

  if (existingDocs.docs.length > 0) {
    return 'Este slug ya está en uso.'
  }
  return true
}

/**
 * Valida archivos de imagen (para usar en hooks de la colección Media, no como validador de campo directo)
 * Nota: Payload maneja la validación de mimeTypes y maxFileSize directamente en la configuración del campo 'upload'.
 * Esta función es más para validaciones personalizadas o en un hook `beforeChange` de la colección Media.
 */
export const validateImageFile = (file: { type: string; size: number } | null | undefined) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!file) {
    return true // No hay archivo para validar (si es opcional)
  }

  if (!allowedTypes.includes(file.type)) {
    return 'Solo se permiten archivos de imagen (JPEG, PNG, WebP, GIF)'
  }

  if (file.size > maxSize) {
    return 'El archivo no puede exceder 5MB'
  }

  return true
}
