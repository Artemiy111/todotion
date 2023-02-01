import prisma from '~/server/db/prisma'

export default defineEventHandler(async () => {
  return await prisma.todoRow.findMany().catch(() => {
    throw createError({ message: 'Could not return rows', statusCode: 500 })
  })
})
