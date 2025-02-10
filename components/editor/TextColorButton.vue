<script lang="ts" setup>
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const value = editor.value?.getAttributes('textStyle').color || '#000000'

function onChange(color: string) {
  editor.value?.chain().focus().setColor(color).run()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button :class="cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <span class="text-xs">
          A
        </span>
        <div
          class="h-0.5 w-full"
          :style="{
            backgroundColor: value,
          }"
        />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2.5">
      <ColorPicker v-model="value" is-widget format="hex" @pure-color-change="onChange" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
