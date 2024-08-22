import AppMenu from '@/layouts/AppMenu.vue';
import DashboardPage from '@/views/Dashboard/DashboardPage.vue';
import LoginPage from '@/views/Login/LoginPage.vue';
import SettingsView from '@/views/SettingsView.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    component: LoginPage,
    name: 'Login',
    meta: {
      layout: 'SimpleLayout',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    components: {
      default: DashboardPage,
      menu: AppMenu,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    components: {
      default: SettingsView,
      menu: AppMenu,
    },
  },
];

export default routes;
