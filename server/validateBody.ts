import type { ZodSchema, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export default <T>(schema: ZodSchema<T>, body: unknown): T => {
  try {
    return schema.parse(body)
  } catch (e) {
    throw createError({
      message: fromZodError(e as ZodError).message,
      statusCode: 400,
    })
  }
}
