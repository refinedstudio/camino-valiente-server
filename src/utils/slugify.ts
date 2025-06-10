/**
 * Convierte un texto en un slug válido
 * @param text - Texto a convertir
 * @returns Slug generado
 */
export const slugify = (text: string): string => {
  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Reemplazar caracteres especiales del español
      .replace(/[áàäâã]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöôõ]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      // Reemplazar espacios y caracteres especiales con guiones
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      // Remover guiones al inicio y final
      .replace(/^-+|-+$/g, '')
  )
}

/**
 * Genera un slug único agregando un sufijo numérico si es necesario
 * @param baseSlug - Slug base
 * @param checkExistence - Función para verificar si el slug existe
 * @returns Slug único
 */
export const generateUniqueSlug = async (
  baseSlug: string,
  checkExistence: (slug: string) => Promise<boolean>,
): Promise<string> => {
  let slug = baseSlug
  let counter = 1

  // Verificar si el slug base ya existe
  while (await checkExistence(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}

/**
 * Extrae el slug de una URL de YouTube
 * @param url - URL de YouTube
 * @returns ID del video o null si no es válida
 */
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

/**
 * Extrae el ID de un video de Vimeo
 * @param url - URL de Vimeo
 * @returns ID del video o null si no es válida
 */
export const extractVimeoId = (url: string): string | null => {
  const pattern = /vimeo\.com\/(?:.*\/)?(\d+)/
  const match = url.match(pattern)

  return match ? match[1] : null
}

/**
 * Detecta la plataforma de video basada en la URL
 * @param url - URL del video
 * @returns Plataforma detectada
 */
export const detectVideoPlatform = (url: string): 'youtube' | 'vimeo' | 'other' => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube'
  }

  if (url.includes('vimeo.com')) {
    return 'vimeo'
  }

  return 'other'
}

/**
 * Genera un excerpt de texto plano desde contenido rich text
 * @param content - Contenido en formato Slate
 * @param maxLength - Longitud máxima del excerpt
 * @returns Excerpt generado
 */
interface RichTextNode {
  text?: string
  children?: RichTextNode[]
  [key: string]: unknown
}

export const generateExcerpt = (content: RichTextNode[], maxLength: number = 160): string => {
  if (!content || !Array.isArray(content)) {
    return ''
  }

  // Extraer texto plano del contenido rich text
  const extractText = (nodes: RichTextNode[]): string => {
    return nodes
      .map((node) => {
        if (node.text) {
          return node.text
        }
        if (node.children && Array.isArray(node.children)) {
          return extractText(node.children)
        }
        return ''
      })
      .join(' ')
  }

  const plainText = extractText(content)

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Cortar en la palabra más cercana
  const truncated = plainText.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
}
