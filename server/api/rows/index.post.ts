import type { ZodError } from 'zod'
import { RowCreateSchema } from '~/schema'
import type { RowCreate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const body = (await readBody(event)) as RowCreate

  try {
    RowCreateSchema.parse(body)
  } catch (e) {
    return createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
      fatal: false,
    })
  }
  return await prisma.todoRow.create({ data: body })
  // return await RowModel.create(body).catch(e =>
  //   createError({
  //     message: e.message,
  //     statusCode: 500,
  //   })
  // )
})
