<script lang="ts" setup>
import { ChevronDownIcon } from 'lucide-vue-next'

defineProps<{
  position: number
  isLeft: boolean
  isDragging: boolean
}>()

defineEmits(['mouseDown', 'doubleClick'])
</script>

<template>
  <div
    class="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
    :style="{ [isLeft ? 'left' : 'right']: `${position}px` }"
    @mousedown="() => $emit('mouseDown')"
    @dblclick="() => $emit('doubleClick')"
  >
    <ChevronDownIcon class="absolute left-1/2 size-32 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
    <div
      class="absolute left-1/2 top-4 transform -translate-x-1/2 duration-150"
      :style="{
        height: '100vh',
        width: '1px',
        transform: 'scaleX(0.5)',
        backgroundColor: '#3b72f6',
        display: isDragging ? 'block' : 'none',
      }"
    />
  </div>
</template>
