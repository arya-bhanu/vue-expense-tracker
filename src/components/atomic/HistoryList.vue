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
        <div v-if="!historyListData.img_url">
          <p class="text-center text-lg font-semibold">Your image transaction is empty</p>
          <form class="flex flex-col items-center my-3" @submit.prevent="handleImageUpload">
            <input
              required
              type="file"
              placeholder="Upload your image"
              accept="image/*"
              @change.prevent="handleImageChange"
            />
            <button class="bg-cyan-500 hover:bg-cyan-700 text-white px-3 py-1 mt-1 rounded-md">
              Upload
            </button>
          </form>
        </div>
        <ShowImage v-else :img-path="historyListData.img_url" />
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
import { inject, ref } from 'vue'
import ShowImage from './modal/ShowImage.vue'
import useCreatePathname from '@/composables/useCreatePathname'
import { useStorageStore, useTransactionStore } from '@/stores/supabase-client'

const useStorage = useStorageStore()
const useTransaction = useTransactionStore()

const props = defineProps<{ historyListData: any; currency: Currency }>()
const currencySymbol = usePickCurrency(props.currency)

const isActive = ref(false)
const imgModel = ref<File | null>(null)
const userRegisteredId = inject('user_registered_id')
const refetch = inject('refetch')

function handleClickModal(val: boolean) {
  isActive.value = val
}

function handleImageChange(e: Event) {
  const img = (e.target as HTMLInputElement).files
  if (img) {
    imgModel.value = img[0]
  }
}

async function handleImageUpload() {
  try {
    if (imgModel.value && (userRegisteredId as unknown as any).value) {
      console.log(userRegisteredId)
      console.log(imgModel.value)
      const { data: uploadedImage, error } = await useStorage.uploadImage(
        useCreatePathname((userRegisteredId as any).value as number),
        imgModel.value
      )
      if (error) {
        throw error
      }
      if (uploadedImage) {
        const newData = { ...props.historyListData, img_url: uploadedImage.path }
        await useTransaction.updateTransaction(
          newData.id,
          newData.title_transaction,
          newData.amount,
          newData.expenses_type,
          newData.img_url
        )
      }
    }
    isActive.value = false
    ;(refetch as () => void)()
  } catch (err) {
    console.error(err)
  }
}
</script>
