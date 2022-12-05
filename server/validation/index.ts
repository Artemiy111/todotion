import { z } from 'zod'

export const CardCreate = z.object({
  title: z.string().optional(),
  order: z.number().int().min(1),
})

export const CardUpdate = z.object({
  title: z.string().optional(),
  order: z.number().int().min(1).optional(),
})

export const RowCreate = z.object({
  text: z.string().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().min(1),
  card: z.string(),
})

export const RowUpdate = z.object({
  text: z.string().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().min(1).optional(),
})
