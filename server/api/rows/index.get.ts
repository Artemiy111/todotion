import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return await prisma.todoRow.findMany().catch(e => {
    createError({ message: 'Could not return rows', statusCode: 500 })
  })
})
