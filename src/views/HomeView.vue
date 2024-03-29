<script setup lang="ts">
import HeadingComponent from '@/components/HeadingComponent.vue'
import BalanceComponent from '@/components/BalanceComponent.vue'
import type { BalancePropsType } from '@/components/BalanceComponent.vue'
import { Currency } from '@/enums'

const balanceData: BalancePropsType = {
  currency: Currency.IDR,
  total_expense: 12000,
  total_income: 20000
}
</script>

<template>
  <main class="flex flex-col gap-y-5">
    <HeadingComponent />
    <BalanceComponent :balance-data="balanceData" />
  </main>
</template>
