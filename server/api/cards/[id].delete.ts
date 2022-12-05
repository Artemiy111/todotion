import { CardModel } from '~/server/models/Card.model'
export default defineEventHandler(async event => {
  const id: string = event.context.params.id

  const deletedCard = await CardModel.findByIdAndDelete(id).catch(e => {
    return createError({
      message: `Could not delete card with id: ${id}`,
      statusCode: 500,
    })
  })

  if (!deletedCard)
    return createError({
      message: `No such card with id: ${id}`,
      statusCode: 400,
    })

  return deletedCard
})
