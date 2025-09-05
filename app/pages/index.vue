<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-3xl w-full rounded-2xl p-8 text-center">
      <h1 class="text-5xl font-bold text-blue-600 mb-6">
        Nuxt 4 Codebase Starter
      </h1>
      <p class="text-gray-600 text-lg mb-6">
        This project is a Nuxt 4 starter codebase configured with commonly used
        modules and conventions to help you build modern frontend applications
        quickly and efficiently.
      </p>

      <h2 class="text-2xl font-semibold text-gray-800 mb-4">🧰 Tech Stack</h2>
      <ul
        class="list-disc list-inside text-left mx-auto max-w-md text-gray-700 space-y-2"
      >
        <li>
          <a
            href="https://nuxt.com"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Nuxt 4</a
          >
        </li>
        <li>
          <a
            href="https://pinia.vuejs.org/"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Pinia</a
          >
        </li>
        <li>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Tailwind CSS</a
          >
        </li>
        <li>
          <a
            href="https://image.nuxt.com/"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Nuxt Image</a
          >
        </li>
        <li>
          <a
            href="https://github.com/nuxt-modules/fonts"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Nuxt Fonts</a
          >
        </li>
        <li>
          <a
            href="https://github.com/nuxt-modules/icon"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Nuxt Icon</a
          >
        </li>
        <li>
          <a
            href="https://github.com/nuxt-modules/eslint"
            target="_blank"
            class="text-blue-600 hover:underline"
            >ESLint Module (Airbnb Style)</a
          >
        </li>
        <li>
          <a
            href="https://typicode.github.io/husky/"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Husky</a
          >
          +
          <a
            href="https://github.com/okonet/lint-staged"
            target="_blank"
            class="text-blue-600 hover:underline"
            >lint-staged</a
          >
        </li>
        <li>
          <a
            href="https://prettier.io/"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Prettier</a
          >
        </li>
        <li>
          <a
            href="https://github.com/commitizen/cz-cli"
            target="_blank"
            class="text-blue-600 hover:underline"
            >Commitizen</a
          >
        </li>
      </ul>

      <div class="mt-8 flex justify-center gap-4">
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
          @click="navigateTo('/posts')"
        >
          🔁 Go to CSR Page
        </button>
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
          @click="navigateTo('/users')"
        >
          📦 Go to SSR Page
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};
</script>
