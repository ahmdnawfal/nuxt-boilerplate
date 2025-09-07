<script setup lang="ts">
import { Button, Input } from '~/components/ui';

const input = ref<string>('');
const { show } = useToast();

const triggerToast = () => {
  show({
    type: 'success',
    title: 'Title',
    description: 'Description',
  });
};
</script>

<template>
  <div class="container m-auto p-4 space-y-4">
    <div>
      <label>Input</label>
      <Input v-model="input" />
    </div>
    <div class="flex flex-col">
      <label>Button</label>
      <Button @click="triggerToast()">Trigger Toast</Button>
    </div>
  </div>
</template>
