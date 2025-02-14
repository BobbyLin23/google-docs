<script lang="ts" setup>
import { LoaderIcon } from 'lucide-vue-next'

defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-2">
    <LoaderIcon class="size-6 text-muted-foreground animate-spin" />
    <p v-if="label" class="text-sm text-muted-foreground">
      {{ label }}
    </p>
  </div>
</template>
