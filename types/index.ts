import { z } from 'zod'
import {
  CardCreateSchema,
  CardUpdateSchema,
  RowCreateSchema,
  RowUpdateSchema,
} from '~/schema'

export type Card = {
  _id: string
  title: string
  order: number
  createdAt: string
  updateAt: string
}

export type CardCreate = z.infer<typeof CardCreateSchema>
export type CardUpdate = z.infer<typeof CardUpdateSchema>

export type Row = {
  _id: string
  text: string
  isCompleted: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export type RowCreate = z.infer<typeof RowCreateSchema>
export type RowUpdate = z.infer<typeof RowUpdateSchema>
