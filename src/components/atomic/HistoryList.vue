<template>
  <li
    :class="
      historyListData.expenses_type === ExpensesType.EXPENSE
        ? ' border-r-red-500'
        : 'border-r-green-500'
    "
    class="flex border-r-8 items-center justify-between px-4 py-5 bg-white shadow-lg"
  >
    <span>{{ historyListData.title_transaction }}</span>
    <p>
      <span>{{ currencySymbol }}</span>
      <span>{{ historyListData.amount }}</span>
    </p>
  </li>
</template>
<script setup lang="ts">
import usePickCurrency from '../../composables/usePickCurrency'
import { Currency, ExpensesType } from '@/enums'
const props = defineProps<{ historyListData: any; currency: Currency }>()
const currencySymbol = usePickCurrency(props.currency)
</script>
