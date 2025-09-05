import { ref } from 'vue';

export function usePosts() {
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
      onError: (_err) => {
        // console.error('Error adding post:', err);
      },
      onSettled: () => {
        isLoadingAdd.value = false;
      },
    });
  };

  onMounted(() => {
    postStore.fetchPosts();
  });

  return {
    postStore,
    addPost,
    isLoadingAdd,
  };
}
