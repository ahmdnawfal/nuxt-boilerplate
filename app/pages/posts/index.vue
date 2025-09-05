<script setup>
const { postStore, addPost, isLoadingAdd } = usePosts();
</script>

<template>
  <AppPageWrapper :loading="postStore.isLoading" :error="postStore.error">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">List Posts</h1>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
        :disabled="isLoadingAdd"
        @click="addPost"
      >
        Add Post {{ isLoadingAdd ? '...' : '' }}
      </button>

      <ul class="space-y-4">
        <li
          v-for="post in postStore.data"
          :key="post.id"
          class="p-4 border rounded hover:shadow transition"
        >
          <h2 class="font-semibold text-lg mb-1">{{ post.title }}</h2>
          <p class="text-gray-700">{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </AppPageWrapper>
</template>
