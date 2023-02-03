import prisma, { type TodoCard } from '~/server/db/prisma'

export default defineEventHandler(async (): Promise<TodoCard[]> => {
  try {
    return await prisma.todoCard.findMany()
  } catch (e) {
    throw createError({ message: 'Could not return cards', statusCode: 500 })
  }
})
