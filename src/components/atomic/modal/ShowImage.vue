a
<template>
  <div>
    <div v-if="isLoadingImg" class="bg-slate-200 animate-pulse h-64 mx-auto"></div>
    <a v-else :href="imgUrl" target="_blank" class="border border-gray-400 block">
      <img :src="imgUrl" class="max-h-64 object-cover w-full" />
    </a>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { useStorageStore } from '@/stores/supabase-client'

const props = defineProps<{ imgPath: string }>()

const useStorage = useStorageStore()
const isLoadingImg = ref(true)
const imgUrl = ref('')

async function loadImage() {
  try {
    const { data: signedUrl } = await useStorage.getSignedUrl(props.imgPath)
    if (signedUrl) {
      imgUrl.value = signedUrl.signedUrl
      isLoadingImg.value = false
    }
  } catch (err) {
    console.error(err)
  }
}

loadImage()
</script>
