import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.request.use((req) => {
    let token: string | undefined | null;

    if (import.meta.server) {
      const cookieHeader = useRequestHeaders()['cookie'];
      const match = cookieHeader?.match(/token=([^;]+)/);
      token = match?.[1];
    } else {
      token = useCookie('token').value;
    }

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      axios: instance,
    },
  };
});
