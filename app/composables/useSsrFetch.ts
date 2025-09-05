export function useSsrFetch<T>(url: string, opts: any = {}) {
  const config = useRuntimeConfig();
  const token = useCookie<string>('token');

  return useFetch<T>(url, {
    baseURL: config.public.apiBase,
    key: url,
    headers: {
      ...(opts.headers || {}),
      Authorization: token.value ? `Bearer ${token.value}` : '',
    },
    ...opts,
  });
}
