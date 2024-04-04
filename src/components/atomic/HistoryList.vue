<template>
  <li
    :class="
      historyListData.expenses_type === ExpensesType.EXPENSE
        ? ' border-r-red-500'
        : 'border-r-green-500'
    "
    class="flex flex-col border-r-8 gap-y-1.5 px-4 py-5 bg-white shadow-lg"
  >
    <div class="flex items-center justify-between flex-wrap">
      <span>{{ historyListData.title_transaction }}</span>
      <p>
        <span>{{ currencySymbol }}</span>
        <span>{{ historyListData.amount }}</span>
      </p>
    </div>
    <div>
      <button>
        <v-icon name="bi-eye-fill" class="text-cyan-600 hover:text-cyan-800" scale="1.5" />
      </button>
    </div>
    <ModalContainer />
  </li>
</template>
<script setup lang="ts">
import usePickCurrency from '../../composables/usePickCurrency'
import ModalContainer from '@/components/atomic/modal/ModalContainer.vue'
import { Currency, ExpensesType } from '@/enums'
const props = defineProps<{ historyListData: any; currency: Currency }>()
const currencySymbol = usePickCurrency(props.currency)
</script>
