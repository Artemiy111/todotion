import type { ZodError } from 'zod'
import { CardUpdateSchema } from '~/schema'
import type { CardUpdate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  const body = (await readBody(event)) as CardUpdate

  try {
    CardUpdateSchema.parse(body)
  } catch (e) {
    return createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
      fatal: false,
    })
  }

  return await prisma.todoCard.update({ where: { id }, data: body }).catch(e =>
    createError({
      message: `Could not update card with id: ${id}`,
      statusCode: 500,
    })
  )
})
