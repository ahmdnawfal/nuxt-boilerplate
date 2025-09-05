<script setup lang="ts">
interface User {
  id: number;
  name: string;
}

const {
  data: users,
  pending,
  error,
} = await useSsrFetch<User[]>('/users', {
  key: 'users',
  default: () => [],
});
</script>

<template>
  <AppPageWrapper :loading="pending" :error="error">
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </AppPageWrapper>
</template>
