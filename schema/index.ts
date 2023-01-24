import { z } from 'zod'

export const CardCreateSchema = z.object({
  title: z.string(),
  order: z.number().int().min(1),
})

export const CardUpdateSchema = z.object({
  title: z.string().optional(),
  order: z.number().int().min(1).optional(),
})

export const RowCreateSchema = z.object({
  text: z.string().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().min(1),
  card: z.string(),
})

export const RowUpdateSchema = z.object({
  text: z.string().optional(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().min(1).optional(),
})
