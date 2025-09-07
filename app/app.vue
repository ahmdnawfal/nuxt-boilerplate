<script setup lang="ts">
import { Toast } from './components/ui';
</script>

<template>
  <NuxtLoadingIndicator />
  <Toast />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
