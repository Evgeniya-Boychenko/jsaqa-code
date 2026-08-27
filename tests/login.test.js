const { test, expect } = require("@playwright/test");
const user = require("../user.js");

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).fill(user.email);
  await page.getByRole("textbox", { name: "Пароль" }).fill(user.password);
  await page.getByTestId("login-submit-btn").click();
  await page.waitForTimeout(5000);
  await expect(page.locator("body")).toContainText("Евгения");
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.getByRole("textbox", { name: "Email" }).fill(user.invalidEmail);
  await page
    .getByRole("textbox", { name: "Пароль" })
    .fill(user.invalidPassword);
  await page.getByTestId("login-submit-btn").click();
  await page.waitForTimeout(2000);
  await expect(page.locator("body")).toContainText("неправильно");
});
