import validateBody from '~/server/validateBody'
import { RowCreateSchema } from '~/schema'

import prisma, { type TodoRow } from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<TodoRow> => {
  const body = validateBody(RowCreateSchema, await readBody(event))

  try {
    const updateOrder = prisma.todoRow.updateMany({
      where: { todoCardId: body.todoCardId, order: { gte: body.order } },
      data: { order: { increment: 1 } },
    })

    const createRow = prisma.todoRow.create({ data: body })

    return (await prisma.$transaction([updateOrder, createRow]))[1]
  } catch (e) {
    throw createError({ message: `Could not create row`, statusCode: 500 })
  }
})
