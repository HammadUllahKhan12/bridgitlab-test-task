import { readonly, ref } from 'vue';

export function useModal<T = boolean>() {
  let resolveFn: (value: T) => void;

  const isModalVisible = ref(false);

  const showModal = () => {
    isModalVisible.value = true;
    return new Promise<T>((resolve) => {
      resolveFn = resolve;
    });
  };

  const confirm = (value: T) => {
    isModalVisible.value = false;
    resolveFn(value);
  };

  return {
    isVisible: readonly(isModalVisible),
    showModal,
    confirm,
  };
}
