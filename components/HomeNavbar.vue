<script lang="ts" setup>

</script>

<template>
  <nav class="flex items-center justify-between size-full">
    <div class="flex gap-3 items-center shrink-0 pr-6">
      <NuxtLink href="/">
        <NuxtImg src="/logo.svg" alt="Logo" width="36" height="36" />
      </NuxtLink>
      <h3 class="text-xl">
        Docs
      </h3>
    </div>
    <SearchInput />
    <UserButton />
  </nav>
</template>
