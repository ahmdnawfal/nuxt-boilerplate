<script setup lang="ts">
defineProps<{
  loading?: boolean;
  error?: {
    statusCode?: number;
    message: string;
    statusMessage?: string;
  } | null;
}>();
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" :key="'loading-' + $route.fullPath">
    <BaseLoading />
  </div>

  <!-- Error -->
  <div v-else-if="error" key="error">
    <slot name="error">
      <ErrorBlock
        :status="error.statusCode || 500"
        :message="error.statusMessage || error.message"
      />
    </slot>
  </div>

  <!-- Success -->
  <div v-else key="content">
    <slot />
  </div>
</template>
