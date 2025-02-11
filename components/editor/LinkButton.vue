<script lang="ts" setup>
import { Link2Icon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const value = ref<string>(editor.value?.getAttributes('link').href || '')

function onChange(href: string) {
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href }).run()
  value.value = ''
}
</script>

<template>
  <DropdownMenu
    @update:open="(open) => {
      if (open) {
        value = editor?.getAttributes('link').href || ''
      }
    }"
  >
    <DropdownMenuTrigger>
      <button :class="cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <Link2Icon class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="p-2.5 flex items-center gap-x-2">
      <Input v-model="value" placeholder="Paste link" />
      <Button @click="onChange(value)">
        Apply
      </Button>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
