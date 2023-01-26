import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return prisma.todoCard
    .findMany()
    .catch(e =>
      createError({ message: 'Could not return cards', statusCode: 500 })
    )
})
