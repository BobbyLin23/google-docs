<script lang="ts" setup>
import { ExternalLinkIcon, FilePenIcon, MoreVerticalIcon, TrashIcon } from 'lucide-vue-next'

defineProps<{
  documentId: SelectDocument['id']
  title: SelectDocument['title']
}>()

defineEmits(['onNewTap'])
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" class="rounded-full">
        <MoreVerticalIcon class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <RenameDialog :document-id="documentId" :initial-title="title">
        <DropdownMenuItem @click.prevent.stop @select.prevent.stop>
          <FilePenIcon class="size-4 mr-2" />
          Rename
        </DropdownMenuItem>
      </RenameDialog>
      <RemoveDialog :document-id="documentId">
        <DropdownMenuItem @click.prevent.stop @select.prevent.stop>
          <TrashIcon class="size-4 mr-2" />
          Remove
        </DropdownMenuItem>
      </RemoveDialog>
      <DropdownMenuItem @click="() => $emit('onNewTap', documentId)">
        <ExternalLinkIcon class="size-4 mr-2" />
        Open in new tab
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
