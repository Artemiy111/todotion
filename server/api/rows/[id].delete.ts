import prisma, { type TodoRow } from '~/server/db/prisma'

export default defineEventHandler(async (event): Promise<TodoRow> => {
  const id = event.context.params.id as string

  const row = await prisma.todoRow.findUniqueOrThrow({ where: { id } })

  try {
    const updateOrder = prisma.todoRow.updateMany({
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

    const deleteRow = prisma.todoRow.delete({ where: { id } })

    return (await prisma.$transaction([updateOrder, deleteRow]))[1]
  } catch (e) {
    throw createError({
      message: `Could not delete row with id: ${id}`,
      statusCode: 500,
    })
  }
})
