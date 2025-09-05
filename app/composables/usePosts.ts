import { ref } from 'vue';

export function usePosts() {
  const api = useApi();
  const postStore = usePostStore();
  const isLoadingAdd = ref(false);

  const addPost = () => {
    isLoadingAdd.value = true;

    const payload = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    postStore.addPost(payload, {
      onSuccess: (res) => {
        postStore.data.unshift(res);
      },
      onError: (err) => {
        api.handleError(err);
      },
      onSettled: () => {
        isLoadingAdd.value = false;
      },
    });
  };

  return {
    postStore,
    addPost,
    isLoadingAdd,
  };
}
