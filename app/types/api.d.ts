export type ApiError = {
  statusCode: number;
  message: string;
};

export type ApiCallbacks<T> = {
  onSuccess?: (_data: T) => void;
  onError?: (_error: ApiError) => void;
  onSettled?: () => void;
};

export type ApiOptions<T> = {
  params?: Record<string, any>;
  data?: any;
} & ApiCallbacks<T>;
