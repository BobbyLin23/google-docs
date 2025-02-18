<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query'
import { templates } from '~/constants/templates'

const router = useRouter()
const { userId, orgId } = useAuth()

const { mutate, isPending: isCreating } = useMutation({
  mutationFn: (data: InsertDocument) => $fetch<SelectDocument>('/api/documents', {
    method: 'POST',
    body: data,
  }),
  onSuccess: (data) => {
    router.push(`/documents/${data.id}`)
  },
})

function onTemplateClick(title: string, initialContent: string) {
  mutate({
    title,
    initialContent,
    ownerId: userId.value!,
    organizationId: orgId.value,
  })
}
</script>

<template>
  <div class="bg-[#F1F3F4]">
    <div class="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
      <h3 class="font-medium">
        Start a new document
      </h3>
      <Carousel>
        <CarouselContent class="-ml-4">
          <CarouselItem
            v-for="template in templates"
            :key="template.id"
            class="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
          >
            <div :class="cn('aspect-[3/4] flex flex-col gap-y-2.5', isCreating && 'pointer-events-none opacity-50')">
              <button
                :disabled="isCreating" :style="{
                  backgroundImage: `url(${template.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }"
                class="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                @click="() => onTemplateClick(template.label, '')"
              />
              <p class="text-sm font-medium truncate">
                {{ template.label }}
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </div>
</template>
