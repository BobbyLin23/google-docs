<script lang="ts" setup>
import { MinusIcon, PlusIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const currentFontSize = computed(() => {
  return editor.value?.getAttributes('textStyle').fontSize ? editor.value?.getAttributes('textStyle').fontSize.replace('px', '') : '16'
})

const fontSize = ref(currentFontSize.value)
const inputValue = ref(fontSize.value)
const isEditing = ref(false)

function updateFontSize(newSize: string) {
  const size = Number.parseInt(newSize)
  if (!Number.isNaN(size) && size > 0) {
    editor.value?.chain().focus().setFontSize(`${size}px`).run()
    fontSize.value = newSize
    inputValue.value = newSize
    isEditing.value = false
  }
}

function increment() {
  const size = Number.parseInt(fontSize.value)
  if (!Number.isNaN(size) && size < 100) {
    updateFontSize(`${size + 1}`)
  }
}

function decrement() {
  const size = Number.parseInt(fontSize.value)
  if (!Number.isNaN(size) && size > 1) {
    updateFontSize(`${size - 1}`)
  }
}
</script>

<template>
  <div class="flex items-center gap-x-0.5">
    <button class="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
      <MinusIcon class="w-4 h-4" @click="decrement" />
    </button>
    <input
      v-if="isEditing"
      v-model="inputValue"
      class="w-10 h-7 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
      @blur="updateFontSize(inputValue)"
      @keydown.enter.prevent="() => {
        updateFontSize(inputValue)
        editor?.commands.focus()
      }"
    >
    <button
      v-else class="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent hover:bg-neutral-200/80"
      @click="() => {
        isEditing = true
        fontSize = currentFontSize
      }"
    >
      {{ currentFontSize }}
    </button>
    <button class="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
      <PlusIcon class="w-4 h-4" @click="increment" />
    </button>
  </div>
</template>
