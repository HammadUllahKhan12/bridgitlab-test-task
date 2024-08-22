import '@/styles/main.scss';
import { defineSetupVue3 } from '@histoire/plugin-vue';
import PrimeVue from 'primevue/config';

export const setupVue3 = defineSetupVue3(({ app /*, story, variant*/ }) => {
  app.use(PrimeVue);

  // Register common UI components.
  const components = import.meta.glob('./components/common/**/*.vue', { eager: true });
  Object.entries(components).forEach(([path, definition]) => {
    const componentName = path
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '');
    if (componentName) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      app.component(componentName, (definition as any).default);
    }
  });
});
