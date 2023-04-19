import validateBody from '~/server/validateBody'
import { RowUpdateSchema } from '~/schema'

import prisma, { type TodoRow } from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<TodoRow> => {
  const id = event.context.params?.id as string

  const body = await validateBody(event, RowUpdateSchema)

  try {
    const updateRow = prisma.todoRow.update({ where: { id }, data: body })

    if (typeof body.order === 'number') {
      const row = await prisma.todoRow.findUniqueOrThrow({ where: { id } })

      if (body.order === row.order) {
        return await updateRow
      } else if (body.order > row.order) {
        const updateOrder = prisma.todoRow.updateMany({
          where: { order: { gt: row.order, lte: body.order } },
          data: { order: { decrement: 1 } },
        })

        prisma.$transaction([updateOrder, updateRow])
      } else if (body.order < row.order) {
        const updateOrder = prisma.todoRow.updateMany({
          where: {
            order: { lt: row.order, gte: body.order },
          },
          data: { order: { increment: 1 } },
        })

        prisma.$transaction([updateOrder, updateRow])
      }
    }

    return await updateRow
  } catch (e) {
    throw createError({
      message: `Could not update row with id: ${id}`,
      statusCode: 500,
    })
  }
})
