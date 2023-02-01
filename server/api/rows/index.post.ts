import validateBody from '~/server/validateBody'
import { RowCreateSchema } from '~/schema'

import prisma from '~/server/db/prisma'

export default defineEventHandler(async event => {
  const body = validateBody(RowCreateSchema, await readBody(event))

  await prisma.todoRow
    .updateMany({
      where: { todoCardId: body.todoCardId, order: { gte: body.order } },
      data: { order: { increment: 1 } },
    })
    .catch(() => {
      throw createError({
        message: `Could not increment order in rows where order >= ${body.order}`,
        statusCode: 500,
      })
    })

  return await prisma.todoRow.create({ data: body }).catch(() => {
    throw createError({ message: `Could not create row`, statusCode: 500 })
  })
})
