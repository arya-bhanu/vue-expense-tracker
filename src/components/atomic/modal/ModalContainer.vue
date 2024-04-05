<template>
  <div>
    <Transition>
      <div v-if="isActive" class="fixed top-0 left-0 right-0 bottom-0 bg-slate-500/40">
        <Transition ref="modal">
          <div
            v-if="isActive"
            class="min-h-[45vh] p-4 flex md:min-h-[50vh] w-full md:w-fit min-w-[50vw] z-30 bg-white fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]"
          >
            <div class="w-full flex min-h-full flex-col items-center justify-center">
              <div class="m-auto">
                <slot></slot>
              </div>
              <button
                class="bg-red-500 w-full md:w-fit block ml-0 md:ml-auto hover:bg-red-600 text-white rounded-md px-3 py-1.5"
                @click="emits('click-modal', false)"
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ isActive: boolean }>()
const modal = ref(null)
const emits = defineEmits<{ (e: 'click-modal', val: boolean): void }>()

onMounted(() => {
  document.body.addEventListener('click', (e) => {
    if (props.isActive) {
      const el = e.target as HTMLElement
      const modalHTML = modal.value as unknown as HTMLElement
      if (el.contains(modalHTML)) {
        emits('click-modal', false)
      }
    }
  })
})
</script>
