import type { ZodError } from 'zod'
import { CardModel } from '~/server/models/Card.model'
import { CardCreateSchema } from '~~/validation'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  try {
    CardCreateSchema.parse(body)
  } catch (e) {
    return createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
    })
  }

  return await CardModel.create(body).catch(e =>
    createError({ message: 'Could not create card' })
  )
})
