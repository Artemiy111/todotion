import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
export type { TodoCard, TodoRow } from '@prisma/client'
