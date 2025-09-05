<script setup lang="ts">
import type { TUser } from '~/types/user';

const {
  data: users,
  pending,
  error,
} = await useSsrFetch<TUser[]>('/users', {
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
