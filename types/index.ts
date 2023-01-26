import { z } from 'zod'
import {
  CardCreateSchema,
  CardUpdateSchema,
  RowCreateSchema,
  RowUpdateSchema,
} from '~/schema'

export type Card = {
  id: string
  title: string
  order: number
  createdAt: string
  updateAt: string
  rows?: Row
}

export type CardCreate = z.infer<typeof CardCreateSchema>
export type CardUpdate = z.infer<typeof CardUpdateSchema>

export type Row = {
  id: string
  text: string
  isCompleted: boolean
  order: number
  createdAt: string
  updatedAt: string
  todoCardId: string
}

export type RowCreate = z.infer<typeof RowCreateSchema>
export type RowUpdate = z.infer<typeof RowUpdateSchema>
