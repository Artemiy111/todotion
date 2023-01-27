import prisma from '~/server/services/prisma'

export default defineEventHandler(async () => {
  return await prisma.todoRow.findMany().catch(e => {
    throw createError({ message: 'Could not return rows', statusCode: 500 })
  })
})
