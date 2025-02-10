<script lang="ts" setup>
import type { LucideIcon } from 'lucide-vue-next'
import { BoldIcon, ItalicIcon, ListTodoIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-vue-next'
import ToolbarButton from './ToolbarButton.vue'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

const sections: {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
}[][] = [
  [
    {
      label: 'Undo',
      icon: Undo2Icon,
      onClick: () => {
        editor.value?.chain().focus().undo().run()
      },
    },
    {
      label: 'Redo',
      icon: Redo2Icon,
      onClick: () => {
        editor.value?.chain().focus().redo().run()
      },
    },
    {
      label: 'Print',
      icon: PrinterIcon,
      onClick: () => {
        window.print()
      },
    },
    {
      label: 'Spell Check',
      icon: SpellCheckIcon,
      onClick: () => {
        const current = editor.value?.view.dom.getAttribute('spellcheck')
        editor.value?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true')
      },
    },
  ],
  [
    {
      label: 'Bold',
      icon: BoldIcon,
      onClick: () => {
        editor.value?.chain().focus().toggleBold().run()
      },
      isActive: editor.value?.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: ItalicIcon,
      onClick: () => {
        editor.value?.chain().focus().toggleItalic().run()
      },
      isActive: editor.value?.isActive('italic'),
    },
    {
      label: 'Underline',
      icon: UnderlineIcon,
      onClick: () => {
        editor.value?.chain().focus().toggleUnderline().run()
      },
      isActive: editor.value?.isActive('underline'),
    },
  ],
  [
    {
      label: 'Comment',
      icon: MessageSquarePlusIcon,
      onClick: () => {

      },
      isActive: false,
    },
    {
      label: 'List Todo',
      icon: ListTodoIcon,
      onClick: () => {
        editor.value?.chain().focus().toggleTaskList().run()
      },
      isActive: editor.value?.isActive('taskList'),
    },
    {
      label: 'Remove Formatting',
      icon: RemoveFormattingIcon,
      onClick: () => {
        editor.value?.chain().focus().unsetAllMarks().run()
      },
    },
  ],
]
</script>

<template>
  <div class="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
    <ToolbarButton v-for="item in sections[0]" :key="item.label" :icon="item.icon" @click="item.onClick" />
    <Separator orientation="vertical" class="bg-neutral-300 h-6" />
    <FontFamilyButton />
    <Separator orientation="vertical" class="bg-neutral-300 h-6" />
    <Separator orientation="vertical" class="bg-neutral-300 h-6" />
    <Separator orientation="vertical" class="bg-neutral-300 h-6" />
    <ToolbarButton v-for="item in sections[1]" :key="item.label" :icon="item.icon" @click="item.onClick" />
    <TextColorButton />
    <HighlightColorButton />
    <Separator orientation="vertical" class="bg-neutral-300 h-6" />
    <ToolbarButton v-for="item in sections[2]" :key="item.label" :icon="item.icon" @click="item.onClick" />
  </div>
</template>
