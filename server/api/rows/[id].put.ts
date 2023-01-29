import type { ZodError } from 'zod'
import { RowUpdateSchema } from '~/schema'
import type { RowUpdate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  const body = (await readBody(event)) as RowUpdate

  try {
    RowUpdateSchema.parse(body)
  } catch (e) {
    throw createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
    })
  }

  if (body.order !== undefined) {
    const row = await prisma.todoRow.findUnique({ where: { id } }).catch(() => {
      throw createError({
        message: `Could not find row with id: ${id}`,
        statusCode: 500,
      })
    })
    if (row === null) throw createError({ message: `No such row with id ${id}`, statusCode: 400 })

    if (body.order > row.order) {
      await prisma.todoRow.updateMany({
        where: { order: { gt: row.order, lte: body.order } },
        data: { order: { decrement: 1 } },
      })
    }

    if (body.order < row.order) {
      await prisma.todoRow.updateMany({
        where: {
          order: { lt: row.order, gte: body.order },
        },
        data: { order: { increment: 1 } },
      })
    }
  }

  return await prisma.todoRow.update({ where: { id }, data: body }).catch(() => {
    throw createError({
      message: `Could not update row with id: ${id}`,
      statusCode: 500,
    })
  })
})
