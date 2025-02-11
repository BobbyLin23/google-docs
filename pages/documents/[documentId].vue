<script setup lang="ts">

</script>

<template>
  <ClientOnly>
    <div class="min-h-screen bg-[#FAFBFD]">
      <div class="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div class="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  </ClientOnly>
</template>
