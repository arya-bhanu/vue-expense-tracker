<template>
  <div>
    <Transition>
      <div v-if="isActive" class="fixed top-0 left-0 right-0 bottom-0 bg-slate-500/40">
        <Transition ref="modal">
          <div
            v-if="isActive"
            class="max-h-[80vh] overflow-auto fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-30"
          >
            <div
              class="min-h-[45vh] bg-white py-3 p-4 flex md:min-h-[50vh] w-full md:w-fit min-w-[50vw]"
            >
              <div class="w-full min-h-full flex flex-col justify-between">
                <div class="flex-1">
                  <slot></slot>
                </div>
                <button
                  class="bg-red-500 w-full my-3 md:w-fit block ml-0 md:ml-auto hover:bg-red-600 text-white rounded-md px-3 py-1.5"
                  @click="emits('click-modal', false)"
                >
                  Close
                </button>
              </div>
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
