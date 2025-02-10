import type { Editor } from '@tiptap/vue-3'

export const useEditorStore = defineStore('editor', () => {
  const editor = ref<Editor | null>(null)

  const setEditor = (newEditor: Editor | null) => {
    editor.value = newEditor
  }

  return {
    editor,
    setEditor,
  }
})
