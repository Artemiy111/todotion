import type { ZodError } from 'zod'

import { CardCreateSchema } from '~/schema'
import type { CardCreate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const body = (await readBody(event)) as CardCreate

  try {
    CardCreateSchema.parse(body)
  } catch (e) {
    return createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
    })
  }

  return await prisma.todoCard
    .create({ data: body })
    .catch(e =>
      createError({ message: 'Could not create card', statusCode: 500 })
    )
})
