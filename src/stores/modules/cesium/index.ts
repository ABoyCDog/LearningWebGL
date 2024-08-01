import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCesiumStore = defineStore('cesium-store', () => {
  const viewer = ref(null);
  const setViewer = (val: any) => {
    viewer.value = val;
  };

  return {
    viewer,
    setViewer,
  };
});
