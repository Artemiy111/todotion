import prisma, { type TodoCard } from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<TodoCard> => {
  const id = event.context.params.id as string

  try {
    const card = await prisma.todoCard.findUniqueOrThrow({ where: { id } })

    const updateOrder = prisma.todoCard.updateMany({
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

    const deleteCard = prisma.todoCard.delete({ where: { id } })

    return (await prisma.$transaction([updateOrder, deleteCard]))[1]
  } catch (e) {
    throw createError({
      message: `Could not delete card with id: ${id}`,
      statusCode: 500,
    })
  }
})
