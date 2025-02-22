<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'

const count = ref(5)

const { value: search } = useSearchParams('search')

const { data: documents, isPending, refetch, error } = useQuery({
  queryKey: ['documents'],
  enabled: false,
  queryFn: async () => {
    const { data } = await $fetch<{
      data: SelectDocument[]
    }>('/api/documents', {
      method: 'GET',
      params: {
        count: count.value,
        search: search.value,
      },
    })

    return data
  },
})

function loadMore(val: number) {
  count.value = val
  refetch()
}

onMounted(() => {
  refetch()
})

watch(search, () => {
  count.value = 5
  refetch()
})

watch(error, () => {
  if (error.value) {
    toast.error(error.value.message)
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
      <HomeNavbar />
    </div>
    <div class="mt-16">
      <TemplateGallery />
      <DocumentsTable
        :documents="documents ?? []"
        :is-loading="isPending"
        :count="count"
        @load-more="loadMore"
      />
    </div>
  </div>
</template>
