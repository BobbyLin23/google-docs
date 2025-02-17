<script setup lang="ts">
const { isSignedIn } = useAuth()
</script>

<template>
  <template v-if="isSignedIn">
    <HomeView />
  </template>
  <ClerkLoading>
    <FullScreenLoader label="Loading Clerk..." />
  </ClerkLoading>
  <template v-if="!isSignedIn">
    <div class="min-h-screen flex items-center justify-center">
      <SignIn />
    </div>
  </template>
</template>
