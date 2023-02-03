import type { H3Event } from 'h3'
import type { ZodSchema, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export default async <T>(event: H3Event, schema: ZodSchema<T>): Promise<T> => {
  const body = (await readBody(event)) as unknown
  try {
    return schema.parse(body)
  } catch (e) {
    throw createError({
      message: fromZodError(e as ZodError).message,
      statusCode: 400,
    })
  }
}
