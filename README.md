# Nuxt 4 Codebase Starter

This project is a Nuxt 4 starter codebase configured with commonly used modules and conventions to help you build modern frontend applications quickly and efficiently.

## 🧰 Tech Stack

- [Nuxt 4](https://nuxt.com)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nuxt Image](https://image.nuxt.com/)
- [Nuxt Fonts](https://github.com/nuxt-modules/fonts)
- [Nuxt Icon](https://github.com/nuxt-modules/icon)
- [Nuxt ESLint Module](https://github.com/nuxt-modules/eslint) using **Airbnb Style Guide**
- [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) for Git hooks
- [Prettier](https://prettier.io/) for code formatting
- [Commitizen](https://github.com/commitizen/cz-cli) for conventional commits

---

## 🧱 Code Structure & Conventions

### 📁 `app/components/pages/*`

Page-level components should be placed under `app/components/pages`.

> 📌 **Note:** Component filenames should use **multiword names** to avoid conflicts with native HTML elements and improve readability.

✅ Recommended:
`app/components/pages/about/AboutBanner.vue`
`app/components/pages/home/HomeHero.vue`

❌ Avoid:
`app/components/pages/about/banner.vue`
`app/components/pages/home/hero.vue`

This aligns with [Vue Style Guide – Rule: Multi-word component names](https://vuejs.org/style-guide/rules-essential.html#multi-word-component-names).

---

### 📁 `app/stores/*`

All API calls are handled inside **Pinia stores** under the `stores` directory.

Example: `app/stores/usePostStore.ts`

Each store should at least contain:

- `data`: for storing API response
- `isLoading`: to handle loading state
- `error`: to store any error messages

Example:

```ts
import { defineStore } from 'pinia';
import type { ApiCallbacks, ApiError } from '~/types/api';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type PostPayload = Omit<Post, 'id'>;

export const usePostStore = defineStore('post', {
  state: () => ({
    data: [] as Post[],
    isLoading: true,
    error: null as ApiError | null,
  }),

  actions: {
    async fetchPosts() {
      const api = useApi();
      this.isLoading = true;
      this.error = null;

      await api.get<Post[]>('/posts', {
        onSuccess: (res) => {
          this.data = res;
        },
        onError: (err) => {
          this.error = err;
        },
        onSettled: () => {
          this.isLoading = false;
        },
      });
    },

    async addPost(payload: PostPayload, callbacks: ApiCallbacks<Post> = {}) {
      const api = useApi();

      await api.post<Post>('/posts', {
        data: payload,
        onSuccess: (res) => {
          callbacks.onSuccess?.(res);
        },
        onError: (err) => {
          callbacks.onError?.(err);
        },
        onSettled: () => {
          callbacks.onSettled?.();
        },
      });
    },
  },
});
```

---

### 📁 `app/composables/*`

For reusable logic between pages/components, use the `composables` directory.

Example:

```ts
const { data, error, isLoading } = useFetchData();
```

---

## 📡 Data Fetching

This starter supports two primary data fetching strategies:

1.  **Server-Side Fetching**: For data needed on initial page load (improves SEO and perceived performance).
2.  **Client-Side Fetching**: For data fetched after user interaction (e.g., submitting a form, clicking a button).

### Server-Side Fetching with `useFetch`

For fetching data that is critical for the initial render of a page, use Nuxt's built-in composables like `useFetch` or `useAsyncData` directly within your `pages` or `components`. Using `await` in `<script setup>` ensures the data is fetched on the server before the page is sent to the browser.

This approach is ideal for SEO and provides a faster "time-to-content" for users.

**Example:** Fetching a list of users on the server.

```vue
<script setup lang="ts">
interface User {
  id: number;
  name: string;
}

// Assuming `useSsrFetch` is a project-specific wrapper around useFetch
// The principles are the same for Nuxt's `useFetch`
const {
  data: users,
  pending,
  error,
} = await useSsrFetch<User[]>('/users', {
  // A unique key to prevent fetching the same data more than once.
  key: 'users',

  // Provides a default value while data is loading to prevent errors.
  // Use a factory function `() => []` for non-primitive types.
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
```

#### Key Concepts Explained:

- **`await useSsrFetch(...)`**: By using `await` at the top level of `<script setup>`, you tell Nuxt to perform the fetch on the server and wait for it to complete before rendering the page.
- **`data: users`**: A reactive reference to the fetched data. It's aliased to a more descriptive name, `users`.
- **`pending`**: A reactive boolean (`true`/`false`) that indicates if the request is still in progress. Perfect for passing to a loading indicator.
- **`error`**: A reactive reference that will contain an error object if the fetch fails.
- **`key`**: **This is crucial.** The key uniquely identifies the request. Nuxt uses it to cache the result and prevent re-fetching the same data on the client-side during hydration.
- **`default`**: Provides an initial value for the `data` ref. This prevents your template from breaking if `data` is `null` before the fetch completes. For objects or arrays, always use a factory function (e.g., `() => []`) to avoid sharing the same instance across requests.

### Client-Side Fetching

For data that is not needed immediately or is fetched in response to a user action (like a button click), you should call an action from your **Pinia store**. This keeps your API logic centralized and reusable.

**Example:** Fetching posts after the component has mounted.

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { usePostStore } from '~/stores/usePostStore';

const postStore = usePostStore();

// Fetch data on the client-side after the component is mounted
onMounted(() => {
  postStore.fetchPosts();
});
</script>

<template>
  <div v-if="postStore.isLoading">Loading posts...</div>
  <div v-else-if="postStore.error">{{ postStore.error }}</div>
  <ul v-else>
    <li v-for="post in postStore.data" :key="post.id">{{ post.title }}</li>
  </ul>
</template>
```

---

## ✅ Commit Convention

This project uses **Conventional Commit Messages** such as:

- `feat`: a new feature
- `fix`: a bug fix
- `refactor`: code refactoring without changing behavior
- `docs`: documentation changes
- `chore`: tooling or config changes
- `style`: code style changes (formatting, semi, etc.)

### 🧑‍💻 Commit with Commitizen

To ensure consistent commit messages, use:

```bash
pnpm commit
```

You’ll be prompted to select a commit type and write a meaningful message.

Example:

```
feat(post): add post creation action to post store
fix(api): handle error in useApi composable
```

---

## 🚀 Getting Started

Install dependencies:

```bash
pnpm install
```

Start development server:

```bash
pnpm dev
```

---

## 🛡️ Pre-Commit Hook

Before each commit, Husky runs the following tasks via `lint-staged`:

- ESLint fix
- Prettier formatting

This ensures consistent and clean code before pushing.

---

Happy coding\! ✨
