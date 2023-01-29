import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  const card = await prisma.todoCard.findUnique({ where: { id } }).catch(e => {
    throw e
  })

  if (card === null)
    throw createError({
      message: `No such card with id: ${id}`,
      statusCode: 500,
    })

  await prisma.todoCard
    .updateMany({
      where: {
        order: {
          gt: card.order,
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
        message: `Could not decrement order in cards where order > ${card.order}`,
        statusCode: 500,
      })
    })

  return await prisma.todoCard.delete({ where: { id } }).catch(e => {
    createError({
      message: `Could not delete card with id: ${id}`,
      statusCode: 500,
    })
  })
})
