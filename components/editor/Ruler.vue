<script lang="ts" setup>
const markers = Array.from({ length: 83 }, (_, i) => i)

const leftMargin = ref(56)
const rightMargin = ref(56)

const isDraggingLeft = ref(false)
const isDraggingRight = ref(false)

const rulerRef = ref<HTMLDivElement | null>(null)

function handleMouseMove(e: MouseEvent) {
  const PAGE_WIDTH = 816
  const MINIMUM_SPACE = 50

  if ((isDraggingLeft.value || isDraggingRight.value) && rulerRef.value) {
    const container = rulerRef.value.querySelector('#ruler-container')
    if (container) {
      const containerRect = container.getBoundingClientRect()
      const relativeX = e.clientX - containerRect.left
      const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX))

      if (isDraggingLeft.value) {
        const maxLeftPosition = PAGE_WIDTH - rightMargin.value - MINIMUM_SPACE
        const newLeftPosition = Math.min(maxLeftPosition, rawPosition)
        leftMargin.value = newLeftPosition
      }
      else if (isDraggingRight.value) {
        const maxRightPosition = PAGE_WIDTH - (leftMargin.value + MINIMUM_SPACE)
        const newRightPosition = Math.min(maxRightPosition, rawPosition)
        const constrainedRightPosition = Math.max(maxRightPosition, newRightPosition)
        rightMargin.value = constrainedRightPosition
      }
    }
  }
}

function handleMouseUp() {
  isDraggingLeft.value = false
  isDraggingRight.value = false
}

function handleLeftDoubleClick() {
  leftMargin.value = 56
}

function handleRightDoubleClick() {
  rightMargin.value = 56
}
</script>

<template>
  <div
    ref="rulerRef"
    class="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <div id="ruler-container" class="size-full relative">
      <Marker
        :position="leftMargin"
        is-left
        :is-dragging="isDraggingLeft"
        @mouse-down="() => { isDraggingLeft = true }"
        @double-click="handleLeftDoubleClick"
      />
      <Marker
        :position="rightMargin"
        :is-left="false"
        :is-dragging="isDraggingRight"
        @mouse-down="() => { isDraggingRight = true }"
        @double-click="handleRightDoubleClick"
      />
      <div class="absolute inset-x-0 bottom-0 h-full">
        <div class="relative h-full w-[816px]">
          <div
            v-for="marker in markers"
            :key="marker"
            class="absolute bottom-0"
            :style="{
              left: `${marker * 816 / 82}px`,
            }"
          >
            <template v-if="marker % 10 === 0">
              <div class="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
              <span class="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                {{ marker / 10 + 1 }}
              </span>
            </template>
            <template v-if="marker % 5 === 0 && marker % 10 !== 0">
              <div class="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
            </template>
            <template v-if="marker % 5 !== 0">
              <div class="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
