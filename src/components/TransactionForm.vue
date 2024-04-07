<template>
  <section>
    <h2 class="font-bold text-2xl py-2 border-b border-b-gray-300">Add new transaction</h2>
    <form @submit.prevent="handleFormSubmit">
      <div class="field-wrapper">
        <label for="text">Text</label>
        <input v-model="textModel" required id="text" type="text" placeholder="Enter text ..." />
      </div>
      <div class="field-wrapper">
        <label for="amount" class="flex flex-col">
          <span>Amount</span>
          <span>(negative - expense, positive - income)</span>
        </label>
        <input
          ref="input_file"
          v-model="amountModel"
          required
          id="amount"
          type="number"
          placeholder="Enter amount ..."
        />
      </div>
      <div class="field-wrapper">
        <label for="image">Upload your image trasanction</label>
        <input
          type="file"
          placeholder="Upload your image"
          accept="image/*"
          @change.prevent="handleImageChange"
        />
      </div>
      <button type="submit" class="bg-teal-500 text-white px-3 py-2.5 w-full hover:bg-teal-700">
        Add Transaction
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStorageStore, useTransactionStore } from '../stores/supabase-client'
import { ExpensesType } from '@/enums'
import useCreatePathname from '@/composables/useCreatePathname'

const props = defineProps<{ userRegisteredId: number }>()
const emits = defineEmits<{ (e: 'refetch'): void }>()

const useTransaction = useTransactionStore()
const useStorage = useStorageStore()

const textModel = ref('')
const amountModel = ref(0)
const imgModel = ref<File | null>(null)

const input_file = ref(null)

const calculateExpenseType = computed(() => {
  if (amountModel.value > 0) {
    return ExpensesType.INCOME
  } else {
    return ExpensesType.EXPENSE
  }
})

function handleImageChange(e: Event) {
  const img = (e.target as HTMLInputElement).files
  if (img) {
    imgModel.value = img[0]
  }
}
async function handleFormSubmit() {
  if (textModel.value && amountModel.value !== 0) {
    try {
      let uploadedImageid = undefined
      if (imgModel.value) {
        const uploadedImage = await useStorage.uploadImage(
          useCreatePathname(props.userRegisteredId),
          imgModel.value
        )
        if (uploadedImage.data) {
          uploadedImageid = uploadedImage.data.path
        } else {
          throw new Error('Failed upload file image')
        }
      }

      await useTransaction.createTransaction(
        props.userRegisteredId,
        textModel.value,
        amountModel.value,
        calculateExpenseType.value,
        uploadedImageid
      )

      textModel.value = ''
      amountModel.value = 0
      imgModel.value = null

      emits('refetch')
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
<style scoped lang="postcss">
form {
  @apply flex flex-col gap-y-4 mt-5;
}
form .field-wrapper {
  @apply flex flex-col;
}
form .field-wrapper input {
  @apply py-2.5 px-3 border border-gray-500;
}
form .field-wrapper label {
  @apply text-lg;
}
</style>
