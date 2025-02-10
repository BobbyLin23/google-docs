<script lang="ts" setup>
import { ChevronDownIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const fonts = [
  {
    label: 'Arial',
    value: 'Arial',
  },
  {
    label: 'Courier New',
    value: 'Courier New',
  },
  {
    label: 'Georgia',
    value: 'Georgia',
  },
  {
    label: 'Times New Roman',
    value: 'Times New Roman',
  },
  {
    label: 'Verdana',
    value: 'Verdana',
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button :class="cn('h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <span class="truncate">
          {{ editor?.getAttributes('text-style').fontFamily || 'Arial' }}
        </span>
        <ChevronDownIcon class="size-4 ml-2 shrink-0" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, value }) in fonts" :key="value" :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                                                                    editor?.getAttributes('text-style').fontFamily === value && 'bg-neutral-200/80',
        )"
        :style="{
          fontFamily: value,
        }"
        @click="() => editor?.chain().focus().setFontFamily(value).run()"
      >
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
