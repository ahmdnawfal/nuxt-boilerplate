import { ref, type Component } from 'vue';

export type ToastType = 'default' | 'success' | 'info' | 'error' | 'warning';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
  icon?: Component;
  duration: number;
  position: ToastPosition;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  const show = (options: Partial<Omit<Toast, 'id'>> & { title: string }) => {
    const id = Date.now();
    const toast: Toast = {
      id,
      type: options.type ?? 'default',
      title: options.title,
      description: options.description,
      icon: options.icon,
      duration: options.duration ?? 3000,
      position: options.position ?? 'top-right',
    };

    toasts.value.push(toast);

    setTimeout(() => remove(id), toast.duration);
  };

  const remove = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return { toasts, show, remove };
}
