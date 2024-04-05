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
    <div class="flex items-center gap-x-2">
      <button @click="() => (isActive = !isActive)">
        <v-icon name="bi-eye-fill" class="text-cyan-600 hover:text-cyan-800" scale="1.3" />
      </button>
      <button>
        <v-icon name="fa-edit" class="text-cyan-600 hover:text-cyan-800" scale="1.3" />
      </button>
    </div>
    <ModalContainer :is-active="isActive" @click-modal="handleClickModal">
      <div>
        <p v-if="!historyListData.img_url" class="text-center text-lg font-semibold">
          Your image transaction is empty
        </p>
        <div class="mt-3">
          <p class="text-center text-base">This transaction was created at :</p>
          <p class="text-center">
            {{ new Date(historyListData.created_at).toLocaleString() }}
          </p>
        </div>
      </div>
    </ModalContainer>
  </li>
</template>
<script setup lang="ts">
import usePickCurrency from '../../composables/usePickCurrency'
import ModalContainer from '@/components/atomic/modal/ModalContainer.vue'
import { Currency, ExpensesType } from '@/enums'
import { ref } from 'vue'
const props = defineProps<{ historyListData: any; currency: Currency }>()
const currencySymbol = usePickCurrency(props.currency)

const isActive = ref(false)

function handleClickModal(val: boolean) {
  isActive.value = val
}
</script>
