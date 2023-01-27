import { TodoRow } from '@prisma/client'
import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  const row = await prisma.todoRow.findUnique({ where: { id } }).catch(e => {
    throw e
  })

  if (row === null)
    throw createError({
      message: `No such row with id: ${id}`,
      statusCode: 500,
    })

  await prisma.todoRow
    .updateMany({
      where: {
        order: {
          gt: row.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    })
    .catch(e => {
      throw createError({
        message: `Could not decrement order in rows where order > ${row.order}`,
        statusCode: 500,
      })
    })

  return await prisma.todoRow.delete({ where: { id } }).catch(e => {
    throw createError({
      message: `Could not delete row with id: ${id}`,
      statusCode: 500,
    })
  })
})
