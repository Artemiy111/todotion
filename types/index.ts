export type { TodoCard, TodoRow } from '@prisma/client'
export type { CardCreate, CardUpdate, RowCreate, RowUpdate } from '~/schema'

export type DraggableChangeEvent<T> = {
  moved: { element: T; oldIndex: number; newIndex: number }
}
