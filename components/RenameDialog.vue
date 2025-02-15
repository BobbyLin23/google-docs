<script lang="ts" setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

const props = defineProps<{
  documentId: SelectDocument['id']
  initialTitle: SelectDocument['title']
}>()

const title = ref(props.initialTitle)
const open = ref(false)

const queryClient = useQueryClient()

const { isPending, mutate } = useMutation({
  mutationKey: ['renameDocument'],
  mutationFn: () => $fetch('/api/documents', {
    method: 'PATCH',
    body: {
      id: props.documentId,
      title: title.value,
    },
  }),
  onSuccess: () => {
    open.value = false
    toast.success('Document renamed successfully')
    queryClient.invalidateQueries({
      queryKey: ['documents'],
    })
  },
  onError: () => {
    toast.error('Failed to rename document')
  },
})

function onSubmit() {
  mutate()
}
</script>

<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <form @submit.prevent="onSubmit">
        <DialogHeader>
          <DialogTitle>
            Rename document
          </DialogTitle>
          <DialogDescription>
            Enter a new name for the document.
          </DialogDescription>
        </DialogHeader>
        <div class="my-4">
          <Input v-model="title" placeholder="Document name" @click.stop />
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" :disabled="isPending" @click.stop="open = false">
            Cancel
          </Button>
          <Button type="submit" :disabled="isPending" @click.stop>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
