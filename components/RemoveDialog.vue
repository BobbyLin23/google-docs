<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

const props = defineProps<{
  documentId: SelectDocument['id']
}>()

const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
  mutationKey: ['removeDocument'],
  mutationFn: async () => $fetch('/api/documents', {
    method: 'DELETE',
    body: {
      id: props.documentId,
    },
  }),
  onSuccess: () => {
    toast.success('Document removed')
    queryClient.invalidateQueries({
      queryKey: ['documents'],
    })
  },
})
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger :as-child="true">
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the document.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction :disabled="isPending" @click.stop="mutate">
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
