const { clickElement, getText } = require("../lib/commands.js");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

jest.setTimeout(60000);

let page;

beforeAll(async () => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

describe("My cinema Booking tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
  });

  test("The today booking", async () => {
    const sessions = await page.$$(".movie-seances__time");
    const lastSession = sessions[sessions.length - 1];

    await lastSession.evaluate((el) => el.scrollIntoView());
    await delay(500);
    await lastSession.evaluate((el) => el.click());

    await page.waitForSelector(".buying-scheme__chair_standart", {
      timeout: 10000,
    });

    await clickElement(page, ".buying-scheme__chair_standart");

    await delay(1000);

    await clickElement(page, ".acceptin-button");

    await page.waitForSelector(".ticket__check-title", { timeout: 10000 });

    const confirmationText = await getText(page, ".ticket__check-title");
    expect(confirmationText).toContain("Вы выбрали билеты:");
  });

  test("The future booking", async () => {
    const days = await page.$$(".page-nav__day");
    const lastDay = days[days.length - 1];

    await lastDay.evaluate((el) => el.click());
    await delay(1000);

    const sessions = await page.$$(".movie-seances__time");
    const lastSession = sessions[sessions.length - 1];

    await lastSession.evaluate((el) => el.scrollIntoView());
    await delay(500);
    await lastSession.evaluate((el) => el.click());

    await page.waitForSelector(".buying-scheme__chair_standart", {
      timeout: 10000,
    });

    await clickElement(page, ".buying-scheme__chair_standart");

    await delay(1000);

    await clickElement(page, ".acceptin-button");

    await page.waitForSelector(".ticket__check-title", { timeout: 10000 });

    const confirmationText = await getText(page, ".ticket__check-title");
    expect(confirmationText).toContain("Вы выбрали билеты:");
  });

  test("Impossible to book a reserved seat", async () => {
    const sessions = await page.$$(".movie-seances__time");
    const lastSession = sessions[sessions.length - 1];

    await lastSession.evaluate((el) => el.scrollIntoView());
    await delay(500);
    await lastSession.evaluate((el) => el.click());

    await page.waitForSelector(".buying-scheme__chair_taken", {
      timeout: 10000,
    });

    await clickElement(page, ".buying-scheme__chair_taken");

    await delay(1000);

    const isButtonDisabled = await page.$eval(
      ".acceptin-button",
      (btn) => btn.disabled,
    );
    expect(isButtonDisabled).toBe(true);
  });
});
