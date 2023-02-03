import prisma, { type TodoRow } from '~/server/db/prisma'

export default defineEventHandler(async (): Promise<TodoRow[]> => {
  try {
    return await prisma.todoRow.findMany()
  } catch (e) {
    throw createError({ message: 'Could not return rows', statusCode: 500 })
  }
})
