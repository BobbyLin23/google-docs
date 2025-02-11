<script lang="ts" setup>
import type { Level } from '@tiptap/extension-heading'
import { ChevronDownIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const open = ref(false)

const headings = [
  {
    label: 'Normal text',
    value: 0,
    fontSize: '16px',
  },
  {
    label: 'Heading 1',
    value: 1,
    fontSize: '32px',
  },
  {
    label: 'Heading 2',
    value: 2,
    fontSize: '24px',
  },
  {
    label: 'Heading 3',
    value: 3,
    fontSize: '20px',
  },
  {
    label: 'Heading 4',
    value: 4,
    fontSize: '18px',
  },
  {
    label: 'Heading 5',
    value: 5,
    fontSize: '16px',
  },
]

function getCurrentHeading() {
  for (let level = 1; level <= 5; level++) {
    if (editor.value?.isActive(level)) {
      return `Heading ${level}`
    }
  }
  return 'Normal text'
}
</script>

<template>
  <DropdownMenu :open="open" @update:open="open = $event">
    <DropdownMenuTrigger>
      <button class="h-7 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
        <span class="truncate">
          {{ getCurrentHeading() }}
        </span>
        <ChevronDownIcon class="size-4 ml-2 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, value, fontSize }) in headings"
        :key="value"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                   ((value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value })) && 'bg-neutral-200/80',
        )"
        :style="{
          fontSize,
        }"
        @click="() => {
          if (value === 0) {
            editor?.chain().focus().setParagraph().run()
          }
          else {
            editor?.chain().focus().toggleHeading({ level: value as Level }).run()
          }
          open = false
        }"
      >
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
