<script setup lang="ts">
const props = defineProps<{
  status: number;
  message: string;
  image?: string;
}>();

const defaultImage = '/error-default.svg';
const image = computed(() => props.image || defaultImage);
</script>

<template>
  <div
    class="min-h-screen overflow-hidden flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900"
  >
    <NuxtImg
      :src="image"
      alt="Error illustration"
      class="w-52 h-auto mb-6 opacity-80"
      format="webp"
      loading="lazy"
      placeholder
    />

    <h1 class="text-3xl font-bold text-red-500 mb-2">Error {{ status }}</h1>

    <p class="text-gray-600 dark:text-gray-300 max-w-md mb-6">
      {{ message }}
    </p>

    <slot />
  </div>
</template>
