const { test, expect } = require("@playwright/test");
const {
  email,
  password,
  invalidEmail,
  invalidPassword,
} = require("../user.js");

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.waitForTimeout(2000);

  await page.click("text=Войти");
  await page.waitForTimeout(2000);

  await page.click("text=Другие способы входа");
  await page.waitForTimeout(1000);

  await page.click("text=Войти по почте");
  await page.waitForTimeout(1000);

  await page.waitForSelector('input[name="email"]', { timeout: 10000 });

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);

  const pageText = await page.locator("body").textContent();
  expect(pageText).toContain("Вход в личный кабинет");
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.waitForTimeout(2000);

  await page.click("text=Войти");
  await page.waitForTimeout(2000);

  await page.click("text=Другие способы входа");
  await page.waitForTimeout(1000);

  await page.click("text=Войти по почте");
  await page.waitForTimeout(1000);

  await page.waitForSelector('input[name="email"]', { timeout: 10000 });

  await page.fill('input[name="email"]', invalidEmail);
  await page.fill('input[name="password"]', invalidPassword);
  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);

  const pageText = await page.locator("body").textContent();
  expect(pageText).toContain("Вход в личный кабинет");
});
