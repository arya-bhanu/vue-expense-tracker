<template>
  <section>
    <div>
      <h3 class="text-xl font-semibold">YOUR BALANCE</h3>
      <h1 class="flex items-center text-4xl font-semibold">
        <span>{{ currencySymbol }}</span>
        <span>{{ balanceData.total_income - balanceData.total_expense }}</span>
      </h1>
    </div>
    <div class="flex items-center py-5 px-4 gap-x-5 divide-x-2 bg-white shadow-lg mt-5">
      <div class="box-balance">
        <h4 class="title">INCOME</h4>
        <span class="text-green-500">+{{ currencySymbol }} {{ balanceData.total_income }}</span>
      </div>
      <div class="box-balance">
        <h4 class="title">EXPENSE</h4>
        <span class="text-red-500">-{{ currencySymbol }} {{ balanceData.total_expense }}</span>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Currency } from '../enums'
import { computed } from 'vue'
export type BalancePropsType = {
  total_income: number
  total_expense: number
  currency: Currency
}
const props = defineProps<{ balanceData: BalancePropsType }>()
const currencySymbol = computed(() => {
  switch (props.balanceData.currency) {
    case Currency.IDR:
      return 'Rp.'
    case Currency.USD:
      return '$'
    default:
      return 'Rp.'
  }
})
</script>

<style scoped lang="postcss">
.box-balance {
  @apply flex flex-col flex-1 items-center;
}

.box-balance .title {
  @apply font-semibold text-xl;
}

.box-balance h4.title + span {
  @apply text-xl;
}

.box-balance .title span {
  @apply text-center;
}
</style>
