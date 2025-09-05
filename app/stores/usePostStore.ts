import { defineStore } from 'pinia';
import type { ApiCallbacks, ApiError } from '~/types/api';
import type { TPost, TPostPayload } from '~/types/post';

export const usePostStore = defineStore('post', {
  state: () => ({
    data: [] as TPost[],
    isLoading: true,
    error: null as ApiError | null,
  }),

  actions: {
    async fetchPosts() {
      const api = useApi();
      this.isLoading = true;
      this.error = null;

      await api.get<TPost[]>('/posts', {
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

    async addPost(payload: TPostPayload, callbacks: ApiCallbacks<TPost> = {}) {
      const api = useApi();

      await api.post<TPost>('/posts', {
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
