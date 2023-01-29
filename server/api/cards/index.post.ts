import type { ZodError } from 'zod'

import { CardCreateSchema } from '~/schema'
import type { CardCreate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const body = (await readBody(event)) as CardCreate

  try {
    CardCreateSchema.parse(body)
  } catch (e) {
    throw createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
    })
  }

  await prisma.todoCard
    .updateMany({
      where: { order: { gte: body.order } },
      data: { order: { increment: 1 } },
    })
    .catch(e => {
      throw createError({
        message: `Could not increment order in cards where order >= ${body.order}`,
        statusCode: 500,
      })
    })

  return await prisma.todoCard.create({ data: body }).catch(e => {
    throw createError({ message: 'Could not create card', statusCode: 500 })
  })
})
