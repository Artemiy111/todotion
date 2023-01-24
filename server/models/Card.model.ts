import { Schema, model } from 'mongoose'
import { RowModel } from '~/server/models/Row.model'

export const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

cardSchema.pre('init', async function (next) {
  console.log('init')
  console.log(this)
})
cardSchema.pre('save', async function (next) {
  console.log('save')
  console.log(this)
})

cardSchema.pre('findOneAndDelete', async function (next) {
  console.log('findOneAndDelete')

  // await RowModel.deleteMany().where('card').equals()
})
cardSchema.pre('findOneAndUpdate', async function (next) {
  console.log('update')
  console.log(this)
})

// cardSchema.pre('deleteOne',

export const CardModel = model('Card', cardSchema)
