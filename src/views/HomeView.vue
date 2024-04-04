<script setup lang="ts">
import HeadingComponent from '@/components/HeadingComponent.vue'
import BalanceComponent from '@/components/BalanceComponent.vue'
import TransactionForm from '@/components/TransactionForm.vue'
import type { BalancePropsType } from '@/components/BalanceComponent.vue'
import HistoryExpenses from '@/components/HistoryExpenses.vue'
import { Currency, ExpensesType } from '@/enums'
import BasicLayout from '@/layouts/basic-layout.vue'
import useGetUserData from '@/composables/useGetUserData'
import { useTransactionStore } from '../stores/supabase-client'
import { ref, watch } from 'vue'
import type { TransactionType } from '@/types'

const balanceData = ref<BalancePropsType | null>(null)
const rowDataTransaction = ref<TransactionType[] | null>([])

const { currency, registerd_user_id } = useGetUserData()
const useTransaction = useTransactionStore()

watch(
  [registerd_user_id, currency],
  (curr) => {
    fetchAmountBalance(Number(curr[0]))
    fetchListTransaction(Number(curr[0]))
  },
  { immediate: true }
)

async function refetchAll() {
  fetchAmountBalance(Number(registerd_user_id.value))
  fetchListTransaction(Number(registerd_user_id.value))
}

async function fetchAmountBalance(registeredId: number) {
  const { errorSumTransaction, sumTransaction } =
    await useTransaction.selectAllTransaction(registeredId)
  if (errorSumTransaction) {
    console.error(errorSumTransaction)
    return
  }
  balanceData.value = {
    currency: Currency[currency.value as Currency],
    total_expense:
      sumTransaction.find((el: any) => el.expenses_type === ExpensesType.EXPENSE)?.total_sum || 0,
    total_income:
      sumTransaction.find((el: any) => el.expenses_type === ExpensesType.INCOME)?.total_sum || 0
  }
}

async function fetchListTransaction(registeredId: number) {
  const { rowTransaction, errorTransaction } =
    await useTransaction.selectAllTransaction(registeredId)
  if (errorTransaction) {
    return console.error(errorTransaction)
  }
  rowDataTransaction.value = rowTransaction
}
</script>

<template>
  <BasicLayout>
    <main class="flex flex-col gap-y-5">
      <HeadingComponent />
      <BalanceComponent v-if="balanceData" :balance-data="balanceData" />
      <HistoryExpenses
        v-if="rowDataTransaction && currency"
        :currency="Currency[currency as Currency]"
        :row-data-transaction="rowDataTransaction"
      />
      <TransactionForm :user-registered-id="Number(registerd_user_id)" @refetch="refetchAll" />
    </main>
  </BasicLayout>
</template>
