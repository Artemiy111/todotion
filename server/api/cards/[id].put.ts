import validateBody from '~/server/validateBody'
import { CardUpdateSchema } from '~/schema'

import prisma, { type TodoCard } from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<TodoCard> => {
  const id = event.context.params.id as string
  const body = validateBody(CardUpdateSchema, await readBody(event))

  try {
    const updateCard = prisma.todoCard.update({ where: { id }, data: body })

    if (typeof body.order === 'number') {
      const card = await prisma.todoCard.findUniqueOrThrow({ where: { id } })

      if (body.order === card.order) {
        return await updateCard
      } else if (body.order > card.order) {
        const updateOrder = prisma.todoCard.updateMany({
          where: { order: { gt: card.order, lte: body.order } },
          data: { order: { decrement: 1 } },
        })

        return (await prisma.$transaction([updateOrder, updateCard]))[1]
      } else if (body.order < card.order) {
        const updateOrder = prisma.todoCard.updateMany({
          where: {
            order: { lt: card.order, gte: body.order },
          },
          data: { order: { increment: 1 } },
        })

        return (await prisma.$transaction([updateOrder, updateCard]))[1]
      }
    }

    return await updateCard
  } catch (e) {
    throw createError({
      message: `Could not update card with id: ${id}`,
      statusCode: 500,
    })
  }
})
