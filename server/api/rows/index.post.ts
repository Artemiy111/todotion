import type { ZodError } from 'zod'
import { RowModel } from '~/server/models/Row.model'
import { RowCreateSchema } from '~/schema'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  try {
    RowCreateSchema.parse(body)
  } catch (e) {
    return createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
      fatal: false,
    })
  }

  return await RowModel.create(body).catch(e =>
    createError({
      message: e.message,
      statusCode: 500,
    })
  )
})
