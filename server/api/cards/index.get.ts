import prisma from '~/server/services/prisma'

export default defineEventHandler(async () => {
  return await prisma.todoCard.findMany().catch(e => {
    throw createError({ message: 'Could not return cards', statusCode: 500 })
  })
})
