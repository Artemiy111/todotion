import { RowModel } from '~/server/models/Row.model'
export default defineEventHandler(async event => {
  const id: string = event.context.params.id

  const deletedRow = await RowModel.findByIdAndDelete(id).catch(e =>
    createError({
      message: `Could not delete row with id: ${id}`,
      statusCode: 500,
    })
  )

  if (!deletedRow)
    return createError({
      message: `No such row with id: ${id}`,
      statusCode: 400,
    })

  return deletedRow
})
