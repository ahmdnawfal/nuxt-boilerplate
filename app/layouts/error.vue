<script setup lang="ts">
interface ErrorProps {
  error: {
    statusCode: number;
    statusMessage?: string;
    message: string;
  };
}

defineProps<ErrorProps>();
</script>

<template>
  <ErrorBlock
    :status="error.statusCode"
    :message="error.statusMessage || error.message"
  />
</template>
