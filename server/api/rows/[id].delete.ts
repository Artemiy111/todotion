import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  return await prisma.todoRow.delete({ where: { id } }).catch(e =>
    createError({
      message: `No such row with id: ${id}`,
      statusCode: 400,
    })
  )
})
