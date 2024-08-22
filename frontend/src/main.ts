import '@/styles/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

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

app.mount('#app');
