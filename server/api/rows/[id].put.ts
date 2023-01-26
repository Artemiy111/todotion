import type { ZodError } from 'zod'
import { RowUpdateSchema } from '~/schema'
import type { RowUpdate } from '~/types'

import prisma from '~/server/services/prisma'

export default defineEventHandler(async event => {
  const id = event.context.params.id as string

  const body = (await readBody(event)) as RowUpdate

  try {
    RowUpdateSchema.parse(body)
  } catch (e) {
    return createError({
      message: JSON.stringify((e as ZodError).format()),
      statusCode: 400,
      fatal: false,
    })
  }

  return await prisma.todoRow.update({ where: { id }, data: body }).catch(e =>
    createError({
      message: `Could not update row with id: ${id}`,
      statusCode: 500,
      fatal: false,
    })
  )
})
