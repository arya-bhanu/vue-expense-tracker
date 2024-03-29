<template>
  <li
    :class="
      historyListData.expensesType === ExpensesType.EXPENSE
        ? ' border-r-red-500'
        : 'border-r-green-500'
    "
    class="flex border-r-8 items-center justify-between px-4 py-5 bg-white shadow-lg"
  >
    <span>{{ historyListData.titleTransaction }}</span>
    <p>
      <span>{{ currencySymbol }}</span>
      <span>{{ historyListData.amount }}</span>
    </p>
  </li>
</template>
<script setup lang="ts">
import usePickCurrency from '../../composables/usePickCurrency'
import { ExpensesType } from '@/enums'
import type { HistoryExpensesPropsType } from '../HistoryExpenses.vue'
const props = defineProps<{ historyListData: HistoryExpensesPropsType }>()
const currencySymbol = usePickCurrency(props.historyListData.currencySymbol)
</script>
