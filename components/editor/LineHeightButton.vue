<script lang="ts" setup>
import { ListCollapseIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const lineHeights = [
  {
    label: 'Default',
    value: 'normal',
  },
  {
    label: 'Single',
    value: '1',
  },
  {
    label: '1.15',
    value: '1.15',
  },
  {
    label: '1.5',
    value: '1.5',
  },
  {
    label: 'Double',
    value: '2',
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button class="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
        <ListCollapseIcon class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, value }) in lineHeights"
        :key="value"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                   editor?.getAttributes('paragraph').lineHeight === value && 'bg-neutral-200/80',
        )"
        @click="() => editor?.chain().focus().setLineHeight(value).run()"
      >
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
