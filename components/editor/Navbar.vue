<script lang="ts" setup>
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-vue-next'

const editorStore = useEditorStore()
const { editor } = storeToRefs(editorStore)

function insertTable({ rows, cols }: {
  rows: number
  cols: number
}) {
  editor?.value?.chain().focus().insertTable({ rows, cols }).run()
}

function onDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function onSaveJson() {
  if (!editor.value)
    return

  const content = editor.value.getJSON()
  const blob = new Blob([JSON.stringify(content)], {
    type: 'application/json',
  })
  onDownload(blob, 'document.json')
}

function onSaveHTML() {
  if (!editor.value)
    return

  const content = editor.value.getHTML()
  const blob = new Blob([content], {
    type: 'text/html',
  })
  onDownload(blob, 'document.html')
}

function onSaveText() {
  if (!editor.value)
    return

  const content = editor.value.getText()
  const blob = new Blob([content], {
    type: 'text/plain',
  })
  onDownload(blob, 'document.txt')
}

function onPrint() {
  window.print()
}
</script>

<template>
  <ClientOnly>
    <nav class="flex items-center justify-between">
      <div class="flex gap-2 items-center">
        <NuxtLink to="/">
          <NuxtImg src="/logo.svg" alt="logo" width="36" height="36" />
        </NuxtLink>
        <div class="flex flex-col">
          <DocumentInput />
          <div class="flex">
            <Menubar class="border-none bg-transparent p-0 h-auto shadow-none">
              <MenubarMenu>
                <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent class="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon class="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem @click="onSaveJson">
                        <FileJsonIcon class="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem @click="onSaveHTML">
                        <GlobeIcon class="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem @click="onPrint">
                        <FileIcon class="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem @click="onSaveText">
                        <FileTextIcon class="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon class="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon class="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon class="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem @click="onPrint">
                    <PrinterIcon class="size-4 mr-2" />
                    Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem @click="() => editor?.chain().focus().undo().run()">
                    <Undo2Icon class="size-4 mr-2" />
                    Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem @click="() => editor?.chain().focus().redo().run()">
                    <Redo2Icon class="size-4 mr-2" />
                    Redo
                    <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem @click="() => insertTable({ rows: 1, cols: 1 })">
                        1 x 1
                      </MenubarItem>
                      <MenubarItem @click="() => insertTable({ rows: 2, cols: 2 })">
                        2 x 2
                      </MenubarItem>
                      <MenubarItem @click="() => insertTable({ rows: 3, cols: 3 })">
                        3 x 3
                      </MenubarItem>
                      <MenubarItem @click="() => insertTable({ rows: 4, cols: 4 })">
                        4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger class="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon class="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem @click="() => editor?.chain().focus().toggleBold().run()">
                        <BoldIcon class="size-4 mr-2" />
                        Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem @click="() => editor?.chain().focus().toggleItalic().run()">
                        <ItalicIcon class="size-4 mr-2" />
                        Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem @click="() => editor?.chain().focus().toggleUnderline().run()">
                        <UnderlineIcon class="size-4 mr-2" />
                        Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem @click="() => editor?.chain().focus().toggleStrike().run()">
                        <StrikethroughIcon class="size-4 mr-2" />
                        <span>Strikethrough&nbsp;</span>
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem @click="() => editor?.chain().focus().unsetAllMarks().run()">
                    <RemoveFormattingIcon class="size-4 mr-2" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  </ClientOnly>
</template>
