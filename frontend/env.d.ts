/// <reference types="vite/client" />
/// <reference types="@histoire/plugin-vue/components" />

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_TECHLEND_BE_URL: string;
  readonly VITE_DATATOOLS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
