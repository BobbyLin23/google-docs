<script setup lang="ts">

</script>

<template>
  <SignedIn>
    <HomeView />
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
