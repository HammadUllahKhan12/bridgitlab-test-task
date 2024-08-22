<script setup lang="ts">
import { TOKEN_KEY } from '@/consts';
import { api } from '@/api';
import { ref, watch } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/composables/useToast';
import Card from 'primevue/card';
import LoginFooter from './LoginFooter.vue';
import LoginHeader from './LoginHeader.vue';

const cookies = useCookies();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');

const signIn = async () => {
  if (!email.value) {
    toast.error('Email address is missing');
  }
  if (!password.value) {
    toast.error('Password is missing');
  }
  if (!email.value || !password.value) {
    return;
  }
  const returnUrl = (Array.isArray(route.query.url) ? route.query.url[0] : route.query.url) ?? '/dashboard';
  try {
    const response = await api.auth.signIn({ email: email.value, password: password.value });
    if (!response.success) {
      return toast.error('Sign in failed');
    }
    console.log('setting token', TOKEN_KEY, returnUrl);
    cookies.set(TOKEN_KEY, response.token);
    router.push(returnUrl);
  } catch (error) {
    toast.error('An error ocurred');
  }
};

watch(
  () => route.query,
  (val) => {
    if (val.expired) {
      toast.error('You session has expired');
    }
  },
  { immediate: true },
);
</script>

<template>
  <main>
    <LoginHeader />
    <Card class="login-card">
      <template #title>Log in to your account</template>
      <template #content>
        <div>
          <label for="email">Enter your email address</label>
          <div class="send-code">
            <BTextInput id="email" v-model.trim="email" placeholder="Email address" autofocus />
          </div>
        </div>

        <div class="mt-4">
          <label for="password">Enter your password</label>
          <BTextInput id="password" v-model.trim="password" placeholder="Pasword" @keypress.enter="signIn()" />
        </div>

        <BButton variant="primary" class="mt-5 w-full" label="Sign in" @click="signIn()" />
        <BButton variant="link" class="mt-2 w-full" label="Partner with use" />
      </template>
    </Card>
    <LoginFooter />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-image: linear-gradient(180deg, #eef4fa 0%, #fff 100%);
}

label {
  display: block;

  margin-bottom: 0.25rem;

  font-weight: $font-weight-semi;
}

:deep(.p-card) {
  width: calc(100% - 1rem);
  padding: 0 0.5rem;

  background-color: transparent;

  box-shadow: none;

  @media (min-width: 640px) {
    width: 640px;
    padding: 1.5rem 1.5rem 0;

    border-radius: $border-radius-lg;

    background-color: #fff;

    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);

    .p-card-title {
      font-size: 1.75rem;
    }
  }
}

:deep(.btn--link) {
  --button-fg: #{color(grey-500)};

  font-weight: $font-weight-normal;
}

.send-code {
  position: relative;

  :deep(.p-inputtext) {
    padding-right: 7rem;
  }

  .btn--link {
    --button-fg: #54b7f9;
    position: absolute;
    right: 0;

    font-weight: $font-weight-bold;
    font-size: 1rem;
  }
}
</style>
