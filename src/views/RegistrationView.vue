<template>
  <BasicLayout>
    <section class="flex flex-col items-center">
      <h1 class="text-4xl font-bold text-center">Welcome into Vue Expense Tracker App</h1>
      <h3 class="text-2xl font-semibold text-center">Hello World!, Putu Arya</h3>
      <form class="w-full mt-5">
        <div class="flex flex-col gap-y-1">
          <label for="currency" class="text-lg">Choose your currency</label>
          <select name="currency" id="currency" class="py-2 border border-gray-400 px-3">
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
import { computed } from 'vue'
import BasicLayout from '@/layouts/basic-layout.vue'
const currencyKeys = Object.keys(Currency) as Array<keyof typeof Currency>
const currencyObj = computed(() => currencyKeys.map((el) => Currency[el]))
</script>
