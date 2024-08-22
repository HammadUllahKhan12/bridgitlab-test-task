import { TOKEN_KEY } from '@/consts';
import { api } from '@/api';
import { createRouter, createWebHistory } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
import AppRoutes from './app';
const cookies = useCookies();
const routes = [...AppRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log('rouer before each', to, from, cookies.get(TOKEN_KEY));
  if (to.name !== 'Login' && to.name !== 'Login' && from.name !== 'Login') {
    // no cookie
    if (!cookies.get(TOKEN_KEY)) {
      return next({ name: 'Login', replace: true, query: { url: to.fullPath } });
    }
    // verify cookie
    const user = await api.currentUser();
    if (!user?.id) {
      return next({ name: 'Login', replace: true, query: { url: to.fullPath } });
    }
  }
  return next();
});

export default router;
