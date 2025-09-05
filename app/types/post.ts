export type TPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type TPostPayload = Omit<TPost, 'id'>;
