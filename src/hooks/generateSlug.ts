import type { FieldHook } from 'payload'
import slugify from 'slugify'

export const generateSlug: FieldHook = async ({ operation, value, data }) => {
  if (operation === 'create' || (operation === 'update' && !value)) {
    const title = data?.title
    if (title && typeof title === 'string') {
      return slugify(title, { lower: true, strict: true })
    }
  }
  return value
}
