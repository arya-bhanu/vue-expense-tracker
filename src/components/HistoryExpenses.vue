<template>
  <section>
    <h2 class="font-bold text-2xl py-2 border-b border-b-gray-300">History</h2>
    <ul
      v-if="rowDataTransaction.length > 0"
      class="flex flex-col gap-y-3 mt-4 max-h-[50vh] overflow-auto"
    >
      <HistoryList
        v-for="item in rowDataTransaction"
        :key="item.id"
        :history-list-data="item"
        :currency="currency"
      />
    </ul>
    <EmptyHistoryTransaction v-else class="mt-3" />
  </section>
</template>
<script setup lang="ts">
import type { TransactionType } from '../types'
import HistoryList from './atomic/HistoryList.vue'
import type { Currency } from '@/enums'
import EmptyHistoryTransaction from './empty/EmptyHistoryTransaction.vue'

defineProps<{
  rowDataTransaction: TransactionType[]
  currency: Currency
}>()
</script>
