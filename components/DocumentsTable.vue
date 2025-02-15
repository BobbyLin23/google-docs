<script lang="ts" setup>
import { LoaderIcon } from 'lucide-vue-next'

defineProps<{
  isLoading: boolean
  documents: SelectDocument[]
  loadMore?: (pageSize: number) => void
  page: number
}>()
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
    <div v-if="isLoading" class="flex justify-center items-center h-24">
      <LoaderIcon class="animate-spin text-muted-foreground size-5" />
    </div>
    <Table v-else>
      <TableHeader>
        <TableRow class="hover:bg-transparent border-none">
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            &nbsp;
          </TableHead>
          <TableHead class="hidden md:table-cell">
            Shared
          </TableHead>
          <TableHead class="hidden md:table-cell">
            Created At
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="documents.length === 0">
        <TableRow>
          <TableCell colspan="4" class="text-center h-24 text-muted-foreground">
            No documents found
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody v-else>
        <DocumentRow v-for="document in documents" :key="document.id" :document="document" />
      </TableBody>
    </Table>
    <div class="flex items-center justify-center">
      <Button variant="ghost" size="sm" :disabled="false" @click="() => loadMore?.(5)">
        Load more
      </Button>
    </div>
  </div>
</template>
