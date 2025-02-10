<script lang="ts" setup>
import { HighlighterIcon } from 'lucide-vue-next'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const value = editor.value?.getAttributes('highlight').color || '#FFFFFF'

function onChange(color: string) {
  editor.value?.chain().focus().setHighlight({ color }).run()
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button :class="cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <HighlighterIcon class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2.5">
      <ColorPicker v-model="value" is-widget format="hex" @pure-color-change="onChange" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
