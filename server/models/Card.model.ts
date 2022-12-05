import { Schema, model } from 'mongoose'

export const cardSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

export const CardModel = model('Card', cardSchema)
