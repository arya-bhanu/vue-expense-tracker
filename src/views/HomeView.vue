<script setup lang="ts">
import HeadingComponent from '@/components/HeadingComponent.vue'
import BalanceComponent from '@/components/BalanceComponent.vue'
import type { BalancePropsType } from '@/components/BalanceComponent.vue'
import HistoryExpenses from '@/components/HistoryExpenses.vue'
import { Currency, ExpensesType } from '@/enums'
import type { HistoryExpensesPropsType } from '../components/HistoryExpenses.vue'

const balanceData: BalancePropsType = {
  currency: Currency.IDR,
  total_expense: 12000,
  total_income: 20000
}

const historyExpensesData: HistoryExpensesPropsType[] = [
  {
    amount: 12000,
    createdAt: new Date(),
    currencySymbol: Currency.IDR,
    expensesType: ExpensesType.EXPENSE,
    id: '123',
    titleTransaction: 'Artha UI'
  },
  {
    amount: 13000,
    createdAt: new Date(),
    currencySymbol: Currency.IDR,
    expensesType: ExpensesType.INCOME,
    id: '234',
    titleTransaction: 'Beli Madu'
  },
  {
    amount: 12000,
    createdAt: new Date(),
    currencySymbol: Currency.IDR,
    expensesType: ExpensesType.EXPENSE,
    id: '123',
    titleTransaction: 'Artha UI'
  },
  {
    amount: 13000,
    createdAt: new Date(),
    currencySymbol: Currency.IDR,
    expensesType: ExpensesType.INCOME,
    id: '234',
    titleTransaction: 'Beli Madu'
  },
  {
    amount: 12000,
    createdAt: new Date(),
    currencySymbol: Currency.IDR,
    expensesType: ExpensesType.EXPENSE,
    id: '123',
    titleTransaction: 'Artha UI'
  },
  {
    amount: 13000,
    createdAt: new Date(),
    currencySymbol: Currency.IDR,
    expensesType: ExpensesType.INCOME,
    id: '234',
    titleTransaction: 'Beli Madu'
  }
]
</script>

<template>
  <main class="flex flex-col gap-y-5">
    <HeadingComponent />
    <BalanceComponent :balance-data="balanceData" />
    <HistoryExpenses :expenses-data-list="historyExpensesData" />
  </main>
</template>
