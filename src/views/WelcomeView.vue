<template>
  <div class="flex flex-col gap-y-1 justify-center min-h-screen items-center">
    <h1 class="text-5xl font-semibold">Hello People</h1>
    <h3 class="text-3xl">Welcome on CashTrack 👋</h3>
    <p class="text-xl underline">Manage your daily expenses for better life</p>
    <button
      class="mt-3 flex items-center gap-x-1.5 shadow-lg py-2 px-3 hover:bg-slate-200 bg-slate-100 rounded-lg"
      @click="
        async () => {
          try {
            const { error } = await signInUser()
            if (error) throw error
          } catch (err) {
            console.error(err)
          }
        }
      "
    >
      <span>Sign In</span>
      <v-icon name="fc-google" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/supabase-client'
const authStore = useAuthStore()
const signInUser = authStore.signInUser
</script>
<style scoped lang="postcss">
h1,
h3,
p {
  @apply text-center;
}
</style>
