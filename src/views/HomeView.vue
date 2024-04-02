<script setup lang="ts">
import HeadingComponent from '@/components/HeadingComponent.vue'
import BalanceComponent from '@/components/BalanceComponent.vue'
import TransactionForm from '@/components/TransactionForm.vue'
import type { BalancePropsType } from '@/components/BalanceComponent.vue'
import HistoryExpenses from '@/components/HistoryExpenses.vue'
import { Currency, ExpensesType } from '@/enums'
import type { HistoryExpensesPropsType } from '../components/HistoryExpenses.vue'
import BasicLayout from '@/layouts/basic-layout.vue'
import useGetUserData from '@/composables/useGetUserData'

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

const { currency, user_id, registerd_user_id } = useGetUserData()
</script>

<template>
  <BasicLayout>
    {{ currency }}
    {{ user_id }}
    {{ registerd_user_id }}
    <main class="flex flex-col gap-y-5">
      <HeadingComponent />
      <BalanceComponent :balance-data="balanceData" />
      <HistoryExpenses :expenses-data-list="historyExpensesData" />
      <TransactionForm :user-registered-id="Number(registerd_user_id)" />
    </main>
  </BasicLayout>
</template>
