<script setup lang="ts">
import { Color } from '@tiptap/extension-color'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import ImageResize from 'tiptap-extension-resize-image'

const editorStore = useEditorStore()
const { setEditor } = editorStore
const { editor } = storeToRefs(editorStore)

onMounted(() => {
  const newEditor = new Editor({
    onCreate({ editor }) {
      setEditor(editor as Editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({ editor }) {
      setEditor(editor as Editor)
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor as Editor)
    },
    onTransaction({ editor }) {
      setEditor(editor as Editor)
    },
    onFocus({ editor }) {
      setEditor(editor as Editor)
    },
    onBlur({ editor }) {
      setEditor(editor as Editor)
    },
    onContentError({ editor }) {
      setEditor(editor as Editor)
    },
    editorProps: {
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px;',
        class: 'focus:outline-none print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    content: `
      <h2>Try me!</h2>
      <p>This is a simple editor build with Tiptap.</p>
    `,
    extensions: [
      StarterKit,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      ImageResize,
      Underline,
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
  })
  setEditor(newEditor)
})

onUnmounted(() => {
  editor.value?.destroy()
  setEditor(null)
})
</script>

<template>
  <div class="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
    <div class="min-w-max flex justify-center w-[816px] mx-auto py-4 print:py-0 print:w-full print:min-w-0">
      <EditorContent :editor="editor!" />
    </div>
  </div>
</template>
