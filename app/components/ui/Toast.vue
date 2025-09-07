<script setup lang="ts">
import clsx from 'clsx';

const { toasts, remove } = useToast();

function getDefaultIcon(type: string) {
  switch (type) {
    case 'success':
      return 'heroicons:check-circle-16-solid';
    case 'error':
      return 'heroicons:x-circle-16-solid';
    case 'warning':
      return 'heroicons:exclamation-triangle-16-solid';
    case 'info':
      return 'heroicons:exclamation-circle-16-solid';
    default:
      return null;
  }
}
</script>

<template>
  <div>
    <div
      v-for="pos in ['top-right', 'top-left', 'bottom-right', 'bottom-left']"
      :key="pos"
      class="fixed z-50 space-y-2"
      :class="{
        'top-4 right-4': pos === 'top-right',
        'top-4 left-4': pos === 'top-left',
        'bottom-4 right-4': pos === 'bottom-right',
        'bottom-4 left-4': pos === 'bottom-left',
      }"
    >
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts.filter((t) => t.position === pos)"
          :key="toast.id"
          :class="
            clsx(
              'flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg bg-white dark:bg-gray-950 transition-all cursor-pointer',
              'border border-gray-200 dark:border-gray-800',
            )
          "
          @click="remove(toast.id)"
        >
          <!-- Icon (optional) -->
          <Icon
            v-if="toast.icon || getDefaultIcon(toast.type)"
            :name="toast.icon || getDefaultIcon(toast.type)"
            class="text-xl mt-0.5 shrink-0"
            :class="{
              'text-green-500': toast.type === 'success',
              'text-red-500': toast.type === 'error',
              'text-yellow-500': toast.type === 'warning',
              'text-blue-500': toast.type === 'info',
              'text-gray-500 dark:text-gray-400': toast.type === 'default',
            }"
          />

          <!-- Content -->
          <div class="flex flex-col">
            <span class="font-medium text-sm text-gray-900 dark:text-gray-100">
              {{ toast.title }}
            </span>
            <span
              v-if="toast.description"
              class="text-sm text-gray-600 dark:text-gray-400"
            >
              {{ toast.description }}
            </span>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
