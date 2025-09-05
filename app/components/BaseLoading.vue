<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
  >
    <div class="flex flex-col items-center space-y-4">
      <!-- Spinner -->
      <svg
        class="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>

      <!-- Text -->
      <p class="text-gray-500 dark:text-gray-300 text-sm">
        Loading, please wait...
      </p>
    </div>
  </div>
</template>
