<script lang="ts" setup>
import { ListIcon, ListOrderedIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const lists = [
  {
    label: 'Bullet List',
    icon: ListIcon,
    isActive: () => editor.value?.isActive('bulletList'),
    onClick: () => {
      editor.value?.chain().focus().toggleBulletList().run()
    },
  },
  {
    label: 'Ordered List',
    icon: ListOrderedIcon,
    isActive: () => editor.value?.isActive('orderedList'),
    onClick: () => {
      editor.value?.chain().focus().toggleOrderedList().run()
    },
  },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button :class="cn('h-7 min-w-7 shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <ListIcon class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-1 flex flex-col gap-y-1">
      <button
        v-for="({ label, icon, onClick, isActive }) in lists"
        :key="label"
        :class="cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                   isActive() && 'bg-neutral-200/80',
        )"
        @click="onClick"
      >
        <component :is="icon" class="size-4" />
        <span class="text-sm">{{ label }}</span>
      </button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
