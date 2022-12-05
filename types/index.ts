export interface Card {
  _id: string
  title: string
  order: number
  createdAt: string
  updateAt: string
}

export interface Row {
  _id: string
  text: string
  isCompleted: boolean
  order: number
  createdAt: string
  updatedAt: string
}
