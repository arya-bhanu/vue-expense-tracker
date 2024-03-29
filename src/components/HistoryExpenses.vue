<template>
  <section>
    <h2 class="font-bold text-2xl py-2 border-b border-b-gray-300">History</h2>
    <ul class="flex flex-col gap-y-3 mt-4 max-h-[50vh] overflow-auto">
      <HistoryList v-for="item in expensesDataList" :key="item.id" :history-list-data="item" />
    </ul>
  </section>
</template>
<script setup lang="ts">
import type { TransactionType } from '../types'
import HistoryList from './atomic/HistoryList.vue'
import { Currency } from '@/enums'
export type HistoryExpensesPropsType = TransactionType & {
  currencySymbol: Currency
}
defineProps<{ expensesDataList: HistoryExpensesPropsType[] }>()
</script>
