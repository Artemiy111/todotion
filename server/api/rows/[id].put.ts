import type { ZodError } from 'zod'
import { RowModel } from '~/server/models/Row.model'
import { RowUpdate } from '~/server/validation'

export default defineEventHandler(async event => {
  const id: string = event.context.params.id

  const body = await readBody(event)

  try {
    RowUpdate.parse(body)
  } catch (e) {
    return createError({
      message: (e as ZodError).message,
      statusCode: 400,
      fatal: false,
    })
  }

  return await RowModel.findByIdAndUpdate(id, body, {
    new: true,
  }).catch(e =>
    createError({
      message: `Could not update row with id: ${id}`,
      statusCode: 500,
      fatal: false,
    })
  )
})
