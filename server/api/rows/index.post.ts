import type { ZodError } from 'zod'

import { RowCreateSchema } from '~/schema'
import type { RowCreate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const body = (await readBody(event)) as RowCreate

  try {
    RowCreateSchema.parse(body)
  } catch (e) {
    throw createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
    })
  }

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
