<script setup lang="ts">
import { cn } from '~/utils/cn';
import { useAttrs } from 'vue';

defineProps<{
  modelValue: string | number | null;
}>();

defineEmits(['update:modelValue']);

defineOptions({ inheritAttrs: false });

const base =
  'flex w-full rounded-md border border-gray-300 bg-white px-3 text-sm ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400';

const sizes = {
  sm: 'h-9',
  md: 'h-10',
  lg: 'h-11 text-base',
};

const { size, ...restAttrs } = useAttrs() as {
  size?: keyof typeof sizes;
};

const inputClass = cn(base, sizes[size ?? 'md']);
</script>

<template>
  <input
    :value="modelValue"
    :class="inputClass"
    v-bind="restAttrs"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
