import validateBody from '~/server/validateBody'
import { CardCreateSchema } from '~/schema'

import prisma from '~/server/db/prisma'

export default defineEventHandler(async event => {
  const body = validateBody(CardCreateSchema, await readBody(event))

  await prisma.todoCard
    .updateMany({
      where: { order: { gte: body.order } },
      data: { order: { increment: 1 } },
    })
    .catch(() => {
      throw createError({
        message: `Could not increment order in cards where order >= ${body.order}`,
        statusCode: 500,
      })
    })

  return await prisma.todoCard.create({ data: body }).catch(() => {
    throw createError({ message: 'Could not create card', statusCode: 500 })
  })
})
