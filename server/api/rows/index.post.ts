import type { ZodError } from 'zod'
import { RowModel } from '~/server/models/Row.model'
import { RowCreate } from '~/server/validation'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  try {
    RowCreate.parse(body)
  } catch (e) {
    return createError({
      message: (e as ZodError).message,
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
