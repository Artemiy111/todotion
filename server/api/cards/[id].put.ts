import type { ZodError } from 'zod'
import { CardModel } from '~/server/models/Card.model'
import { CardUpdateSchema } from '~/schema'

export default defineEventHandler(async event => {
  const id: string = event.context.params.id

  const body = await readBody(event)

  try {
    CardUpdateSchema.parse(body)
  } catch (e) {
    return createError({
      message: (e as ZodError).message,
      statusCode: 400,
      fatal: false,
    })
  }

  return await CardModel.findByIdAndUpdate(id, body, {
    new: true,
  }).catch(e =>
    createError({
      message: `Could not update card with id: ${id}`,
      statusCode: 500,
      fatal: false,
    })
  )
})
