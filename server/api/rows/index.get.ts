import { RowModel } from '~/server/models/Row.model'

export default defineEventHandler(async event => {
  return await RowModel.find().catch(e =>
    createError({ message: 'Could not return rows', statusCode: 500 })
  )
})
