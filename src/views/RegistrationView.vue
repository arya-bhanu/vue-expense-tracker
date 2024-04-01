<template>
  <BasicLayout>
    <section class="flex flex-col items-center">
      <h1 class="text-4xl font-bold text-center">Welcome into Vue Expense Tracker App</h1>
      <h3 class="text-2xl font-semibold text-center">
        Hello World!, <span v-if="userName">{{ userName }}</span>
        <span v-else>...</span>
      </h3>
      <form @submit.prevent="handleSubmit" class="w-full mt-5">
        <div class="flex flex-col gap-y-1">
          <label for="currency" class="text-lg">Choose your currency</label>
          <select
            required
            v-model="currencyModel"
            name="currency"
            id="currency"
            class="py-2 border border-gray-400 px-3"
          >
            <option v-for="item in currencyObj" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <button class="w-full py-2.5 mt-5 bg-cyan-500 hover:bg-cyan-600 text-white">Confirm</button>
      </form>
    </section>
  </BasicLayout>
</template>
<script setup lang="ts">
import { Currency } from '@/enums'
import { computed, ref } from 'vue'
import BasicLayout from '@/layouts/basic-layout.vue'
import { useAuthStore } from '../stores/supabase-client'
import { useRouter } from 'vue-router'
const currencyKeys = Object.keys(Currency) as Array<keyof typeof Currency>
const useAuth = useAuthStore()
const router = useRouter()

const currencyObj = computed(() => currencyKeys.map((el) => Currency[el]))
const currencyModel = ref(currencyObj.value[0])
const userName = ref('')
const userId = ref('')

async function fetchUser() {
  const name = await useAuth.getUser()
  userName.value = name.data.user?.user_metadata.name
  userId.value = name.data.user?.id || ''
}
fetchUser()

async function handleSubmit() {
  if (currencyModel.value && userId.value) {
    const { data, error } = await registerUser(userId.value, currencyModel.value)
    if (error) throw error
    console.log(data)
    router.replace({ name: 'home' })
  }
}

async function registerUser(userId: string, selectedValue: Currency) {
  const { data, error } = await useAuth.registerUser(userId, selectedValue)
  return { data, error }
}
</script>
