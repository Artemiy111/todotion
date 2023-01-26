import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  return await prisma.todoCard.delete({ where: { id } }).catch(e => {
    createError({
      message: `Could not delete card with id: ${id}`,
      statusCode: 500,
    })
  })
})
