import type { App } from 'vue';
import { createPinia } from 'pinia';

export const setupStore = (app: App<Element>) => {
  const store = createPinia();
  app.use(store);
};

// export * from './modules';
