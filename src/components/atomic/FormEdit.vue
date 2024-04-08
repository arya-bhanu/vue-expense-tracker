<template>
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
    <div v-if="defaultImgUrl" class="field-wrapper">
      <ShowImage :img-path="defaultImgUrl" />
    </div>
    <div v-if="defaultImgUrl" class="field-wrapper">
      <label for="image">Re-Upload your image trasanction</label>
      <input
        type="file"
        placeholder="Upload your image"
        accept="image/*"
        @change.prevent="handleImageChange"
      />
    </div>
    <button type="submit" class="bg-teal-500 text-white px-3 py-2.5 w-full hover:bg-teal-700">
      Update Transaction
    </button>
  </form>
</template>
<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import ShowImage from './modal/ShowImage.vue'
import { useStorageStore, useTransactionStore } from '@/stores/supabase-client'
import useCreatePathname from '@/composables/useCreatePathname'
import { ExpensesType } from '@/enums'

const props = defineProps<{
  id: number
  defaultText: string
  defaultAmount: number
  defaultImgUrl?: string
}>()

const emits = defineEmits<{ (e: 'set-modal-false'): void }>()

const textModel = ref(props.defaultText)
const amountModel = ref(props.defaultAmount)
const imgModel = ref<File | null>(null)

const userRegisteredId = inject('user_registered_id')
const refetch = inject('refetch')

const useStorage = useStorageStore()
const useTransaction = useTransactionStore()

const calculateExpenseType = computed(() => {
  if (amountModel.value > 0) {
    return ExpensesType.INCOME
  } else {
    return ExpensesType.EXPENSE
  }
})

async function handleFormSubmit() {
  try {
    let uploadedImageid = undefined
    if (imgModel.value) {
      const uploadedImage = await useStorage.uploadImage(
        useCreatePathname((userRegisteredId as any).value as number),
        imgModel.value
      )
      if (uploadedImage.data) {
        uploadedImageid = uploadedImage.data.path
      } else {
        throw new Error('Failed upload file image')
      }
    }
    await useTransaction.updateTransaction(
      props.id,
      textModel.value,
      amountModel.value,
      calculateExpenseType.value,
      uploadedImageid
    )
    emits('set-modal-false')
    ;(refetch as () => void)()
  } catch (err) {
    console.error(err)
  }
}
function handleImageChange(e: Event) {
  const img = (e.target as HTMLInputElement).files
  if (img) {
    imgModel.value = img[0]
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
