import { Schema, model } from 'mongoose'
export const rowSchema: Schema = new Schema(
  {
    text: {
      type: String,
      default: '',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
    },
  },
  { timestamps: true }
)

export const RowModel = model('Row', rowSchema)
