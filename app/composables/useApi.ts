import { AxiosError } from 'axios';
import type { ApiOptions, ApiError } from '~/types/api';

export const useApi = () => {
  const { $axios } = useNuxtApp();

  async function request<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    options: ApiOptions<T> = {},
  ): Promise<T | null> {
    const { params, data, onSuccess, onError, onSettled } = options;

    let result: T | null = null;
    let error: ApiError | null = null;

    try {
      const response = await $axios.request<T>({
        method,
        url,
        params: method === 'get' ? params : undefined,
        data: ['post', 'put', 'delete'].includes(method) ? data : undefined,
      });

      result = response.data;
      onSuccess?.(result);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        error = {
          statusCode: err.response.status,
          message:
            err.response.data?.message ||
            err.message ||
            'An error occurred from server response',
        };
      } else if (err instanceof Error) {
        error = {
          statusCode: 500,
          message: err.message,
        };
      } else {
        error = {
          statusCode: 500,
          message: 'An unknown error occurred',
        };
      }

      onError?.(error);
    } finally {
      onSettled?.();
    }

    return result;
  }

  return {
    get: <T>(url: string, opts?: ApiOptions<T>) => request<T>('get', url, opts),
    post: <T>(url: string, opts?: ApiOptions<T>) =>
      request<T>('post', url, opts),
    put: <T>(url: string, opts?: ApiOptions<T>) => request<T>('put', url, opts),
    delete: <T>(url: string, opts?: ApiOptions<T>) =>
      request<T>('delete', url, opts),
  };
};
