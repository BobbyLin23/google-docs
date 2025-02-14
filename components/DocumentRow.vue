<script lang="ts" setup>
import { format } from 'date-fns'
import { Building2Icon, CircleUserIcon, FileIcon, MoreVerticalIcon } from 'lucide-vue-next'

defineProps<{
  document: SelectDocument
}>()
</script>

<template>
  <TableRow class="cursor-pointer">
    <TableCell class="w-[50px]">
      <FileIcon class="size-6 fill-blue-500" />
    </TableCell>
    <TableCell class="font-medium md:w-[45%]">
      {{ document.title }}
    </TableCell>
    <TableCell class="text-muted-foreground hidden md:flex items-center gap-2">
      <Building2Icon v-if="document.organizationId" class="size-4" />
      <CircleUserIcon v-else class="size-4" />
      {{ document.organizationId ? 'Organization' : 'Personal' }}
    </TableCell>
    <TableCell class="text-muted-foreground hidden md:table-cell">
      {{ format(new Date(document.createdAt), 'MMM dd, yyyy') }}
    </TableCell>
    <TableCell class="flex justify-end">
      <Button variant="ghost" size="icon" class="rounded-full">
        <MoreVerticalIcon class="size-4" />
      </Button>
    </TableCell>
  </TableRow>
</template>
