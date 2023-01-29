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
    })
  }

  if (body.order !== undefined) {
    const card = await prisma.todoCard.findUnique({ where: { id } }).catch(() => {
      throw createError({
        message: `Could not find card with id: ${id}`,
        statusCode: 500,
      })
    })
    if (card === null) throw createError({ message: `No such card with id ${id}`, statusCode: 400 })

    if (body.order > card.order) {
      await prisma.todoCard.updateMany({
        where: { order: { gt: card.order, lte: body.order } },
        data: { order: { decrement: 1 } },
      })
    }

    if (body.order < card.order) {
      await prisma.todoCard.updateMany({
        where: {
          order: { lt: card.order, gte: body.order },
        },
        data: { order: { increment: 1 } },
      })
    }
  }

  return await prisma.todoCard.update({ where: { id }, data: body }).catch(() => {
    throw createError({
      message: `Could not update card with id: ${id}`,
      statusCode: 500,
    })
  })
})
