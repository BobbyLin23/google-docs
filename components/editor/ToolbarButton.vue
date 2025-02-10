<script lang="ts" setup>
import type { LucideIcon } from 'lucide-vue-next'

defineProps<{
  isActive?: boolean
  icon: LucideIcon
}>()
</script>

<template>
  <button
    :class="cn('text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
               isActive && 'bg-neutral-200/80',
    )"
  >
    <component :is="icon" class="size-4" />
  </button>
</template>
