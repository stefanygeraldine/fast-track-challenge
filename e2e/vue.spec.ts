import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/fast-track-challenge/')
  await expect(page.locator('div > h1')).toHaveText('Are You a Real Pokemon Master')
})

test('verify the existence of the link "Prove It"', async ({ page }) => {
  await page.goto('/fast-track-challenge/')
  const link = page.locator('a[href="/fast-track-challenge/sign-in"]')
  await expect(link).toHaveCount(1)
  await expect(link).toHaveText('Prove It')
})

test('Go to the sign-in page', async ({ page }) => {
  await page.goto('/fast-track-challenge/')
  const link = page.locator('a[href="/fast-track-challenge/sign-in"]')
  await expect(link).toHaveCount(1)
  await link.click()
  await expect(page).toHaveURL(/sign-in/)
})
