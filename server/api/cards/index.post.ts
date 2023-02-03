import validateBody from '~/server/validateBody'
import { CardCreateSchema } from '~/schema'

import prisma, { type TodoCard } from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<TodoCard> => {
  const body = validateBody(CardCreateSchema, await readBody(event))

  try {
    const updateOrder = prisma.todoCard.updateMany({
      where: { order: { gte: body.order } },
      data: { order: { increment: 1 } },
    })

    const createCardWithRow = prisma.todoCard.create({
      data: { ...body, todoRows: { create: { order: 1 } } },
    })

    return (await prisma.$transaction([updateOrder, createCardWithRow]))[1]
  } catch (e) {
    throw createError({ message: 'Could not create card', statusCode: 500 })
  }
})
