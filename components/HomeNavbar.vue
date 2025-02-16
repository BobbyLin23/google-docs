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
    <div class="flex gap-3 items-center">
      <OrganizationSwitcher
        after-create-organization-url="/"
        after-leave-organization-url="/"
        after-select-organization-url="/"
        after-select-personal-url="/"
      />
      <UserButton />
    </div>
  </nav>
</template>
