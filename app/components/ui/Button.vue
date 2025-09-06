<script setup lang="ts">
import { cn } from '~/utils/cn';

const props = defineProps<{
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}>();

const base =
  'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary/90 disabled:hover:bg-primary',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:hover:bg-gray-100',
};

const sizes = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const buttonClass = cn(
  base,
  variants[props.variant ?? 'primary'],
  sizes[props.size ?? 'md'],
);

defineOptions({ inheritAttrs: false });
</script>

<template>
  <button :disabled="props.disabled" v-bind="$attrs" :class="buttonClass">
    <slot />
  </button>
</template>
