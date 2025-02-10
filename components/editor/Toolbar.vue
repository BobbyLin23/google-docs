<script lang="ts" setup>
import type { LucideIcon } from 'lucide-vue-next'
import { BoldIcon, ItalicIcon, ListTodoIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-vue-next'
import ToolbarButton from './ToolbarButton.vue'

const { editor } = useEditorStore()

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
        editor?.chain().focus().undo().run()
      },
    },
    {
      label: 'Redo',
      icon: Redo2Icon,
      onClick: () => {
        editor?.chain().focus().redo().run()
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
        const current = editor?.view.dom.getAttribute('spellcheck')
        editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true')
      },
    },
  ],
  [
    {
      label: 'Bold',
      icon: BoldIcon,
      onClick: () => {
        editor?.chain().focus().toggleBold().run()
      },
      isActive: editor?.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: ItalicIcon,
      onClick: () => {
        editor?.chain().focus().toggleItalic().run()
      },
      isActive: editor?.isActive('italic'),
    },
    {
      label: 'Underline',
      icon: UnderlineIcon,
      onClick: () => {
        editor?.chain().focus().toggleUnderline().run()
      },
      isActive: editor?.isActive('underline'),
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
        editor?.chain().focus().toggleTaskList().run()
      },
      isActive: editor?.isActive('taskList'),
    },
    {
      label: 'Remove Formatting',
      icon: RemoveFormattingIcon,
      onClick: () => {
        editor?.chain().focus().unsetAllMarks().run()
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
    <Separator orientation="vertical" class="bg-neutral-300 h-6" />
    <ToolbarButton v-for="item in sections[2]" :key="item.label" :icon="item.icon" @click="item.onClick" />
  </div>
</template>
