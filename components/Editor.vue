<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

const editor = ref<Editor | null>(null)

onMounted(() => {
  editor.value = new Editor({
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class: 'focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    content: `<p>Hello</p>`,
    extensions: [StarterKit],
  })
})

onUnmounted(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
    <div class="min-w-max flex justify-center w-[816px] mx-auto py-4 print:py-0 print:w-full print:min-w-0">
      <EditorContent :editor="editor!" />
    </div>
  </div>
</template>
