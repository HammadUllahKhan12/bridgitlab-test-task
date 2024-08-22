import type { ICON_NAMES } from '@/consts';
import type { RouteLocationRaw } from 'vue-router';

export type ClassType = string | Record<string, boolean>;

export type IconName = (typeof ICON_NAMES)[number];

export type MenuOption = {
  id: number | string;
  title: string;
  description?: string;
  icon?: IconName;
  disabled?: boolean;
  to?: RouteLocationRaw;
  url?: string;
};

export type NumberIcon = 'dollar' | 'percentage';

export type TabOption = {
  id: string;
  caption: string;
  icon?: IconName;
};

export type VariantType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
