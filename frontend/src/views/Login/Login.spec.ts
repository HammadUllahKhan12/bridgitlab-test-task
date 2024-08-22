import { expect, test } from '@playwright/test';

test('should log in', async ({ page }) => {
  await page.goto('http://localhost:7200/');
  await page.getByPlaceholder('Email address').fill('broker1@tech-test.bridgit.com.au');
  await page.getByPlaceholder('Pasword').click();
  await page.getByPlaceholder('Pasword').fill('password');
  await page.getByLabel('Sign in').click();
  await page.waitForLoadState('networkidle');
  const url = await page.url();
  expect(url?.split('/').pop()).toBe('dashboard');
  const contents = await page.content();
  expect(contents).toContain('A00001');
  expect(contents).toContain('A00002');
});
