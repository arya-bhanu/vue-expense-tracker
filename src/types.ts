import type { ExpensesType } from './enums'

export type TransactionType = {
  id: string
  titleTransaction: string
  createdAt: Date
  imgUrl?: string
  amount: number
  expensesType: ExpensesType
}
