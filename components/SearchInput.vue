<script lang="ts" setup>
import { SearchIcon, XIcon } from 'lucide-vue-next'
import { useSearchParams } from '~/composables/use-search-params'

const value = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const { setValue: setSearch } = useSearchParams('search')

function handleClear() {
  value.value = ''
  setSearch('')
  inputRef.value?.blur()
}

function handleSubmit(e: Event) {
  e.preventDefault()
  setSearch(value.value)
  inputRef.value?.blur()
}
</script>

<template>
  <div class="flex flex-1 items-center justify-center">
    <form class="relative max-w-[720px] w-full" @submit="handleSubmit">
      <Input
        ref="inputRef"
        v-model="value"
        placeholder="Search"
        class="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        class="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
      >
        <SearchIcon />
      </Button>
      <Button
        v-if="value"
        type="button"
        variant="ghost"
        size="icon"
        class="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        @click="handleClear"
      >
        <XIcon />
      </Button>
    </form>
  </div>
</template>
