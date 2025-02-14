<script setup lang="ts">
import { SignedIn } from '#components'
import { useQuery } from '@tanstack/vue-query'

const { data: documents, isPending } = useQuery({
  queryKey: ['documents'],
  queryFn: async () => {
    const { data, pagination } = await $fetch<{
      data: SelectDocument[]
      pagination: any
    }>('/api/documents', {
      method: 'GET',
    })

    return {
      data,
      pagination,
    }
  },
})
</script>

<template>
  <SignedIn>
    <div class="min-h-screen flex flex-col">
      <div class="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <HomeNavbar />
      </div>
      <div class="mt-16">
        <TemplateGallery />
        <DocumentsTable :documents="documents?.data!" :is-loading="isPending" :page="1" />
      </div>
    </div>
  </SignedIn>
  <ClerkLoading>
    <FullScreenLoader label="Loading Clerk..." />
  </ClerkLoading>
  <SignedOut>
    <div class="min-h-screen flex items-center justify-center">
      <SignIn />
    </div>
  </SignedOut>
</template>
