import { z } from 'zod'

export const CardCreateSchema = z.object({
  title: z.string().trim().min(1),
  order: z.number().int().min(1),
})
export type CardCreate = z.infer<typeof CardCreateSchema>

export const CardUpdateSchema = z.object({
  title: z.string().optional(),
  order: z.number().int().min(1).optional(),
  color: z.string().min(1).optional(),
})
export type CardUpdate = z.infer<typeof CardUpdateSchema>

export const RowCreateSchema = z.object({
  text: z.string().trim().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().min(1),
  todoCardId: z.string(),
})
export type RowCreate = z.infer<typeof RowCreateSchema>

export const RowUpdateSchema = z.object({
  text: z.string().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().min(1).optional(),
})
export type RowUpdate = z.infer<typeof RowUpdateSchema>
