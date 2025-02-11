<script lang="ts" setup>
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const open = ref(false)
const imageUrl = ref<string>('')

function onChange(src: string) {
  editor.value?.chain().focus().setImage({ src }).run()
}

function onUpload() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imageUrl.value = e.target?.result as string
        onChange(imageUrl.value)
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

function handleImageUrlSubmit() {
  if (imageUrl.value) {
    onChange(imageUrl.value)
    imageUrl.value = ''
    open.value = false
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <button :class="cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden')">
        <ImageIcon class="size-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="onUpload">
        <UploadIcon class="size-4 mr-2" />
        Upload
      </DropdownMenuItem>
      <DropdownMenuItem @click="() => open = true">
        <SearchIcon class="size-4 mr-2" />
        Paste image url
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Dialog :open="open" @update:open="open = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Inset image URL
        </DialogTitle>
      </DialogHeader>
      <Input v-model="imageUrl" placeholder="Insert image URL" @keydown.enter="handleImageUrlSubmit" />
      <DialogFooter>
        <Button @click="handleImageUrlSubmit">
          Insert
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
