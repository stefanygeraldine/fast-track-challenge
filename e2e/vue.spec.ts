import { test, expect } from '@playwright/test'

// Asumiendo que VITE_BASE_URL está definida en las variables de entorno
const baseUrl = process.env.BASE_URL || '/fast-track-challenge/'

test('visits the app root url', async ({ page }) => {
  await page.goto(baseUrl)
  await expect(page.getByRole('heading', { name: 'Are You a Real Pokemon Master' })).toBeVisible()
})

test('verify the existence of the link "Prove It"', async ({ page }) => {
  await page.goto(baseUrl)
  const link = page.getByRole('link', { name: 'Prove It' })
  await expect(link).toHaveCount(1)
  await expect(link).toHaveText('Prove It')
})

test('Go to the sign-in page', async ({ page }) => {
  await page.goto(baseUrl)
  await page.getByRole('link', { name: 'Prove It' }).click()
  await expect(page).toHaveURL(/.*sign-in/)
})
