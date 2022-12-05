import { CardModel } from '~/server/models/Card.model'

export default defineEventHandler(async event => {
  return await CardModel.find().catch(e =>
    createError({ message: 'Could not return cards', statusCode: 500 })
  )
})
