<script lang="ts" setup>
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const alignments = [
  {
    label: 'Align left',
    value: 'left',
    icon: AlignLeftIcon,
  },
  {
    label: 'Align center',
    value: 'center',
    icon: AlignCenterIcon,
  },
  {
    label: 'Align right',
    value: 'right',
    icon: AlignRightIcon,
  },
  {
    label: 'Justify',
    value: 'justify',
    icon: AlignJustifyIcon,
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button :class="cn('h-7 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <AlignLeftIcon class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, value, icon }) in alignments"
        :key="value"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                   editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80',
        )"
        @click="() => editor?.chain().focus().setTextAlign(value).run()"
      >
        <component :is="icon" class="size-4" />
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
