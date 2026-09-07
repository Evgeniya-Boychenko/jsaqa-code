const { defineFeature, loadFeature } = require("jest-cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

const feature = loadFeature("./tests/features/booking.feature");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

jest.setTimeout(60000);

let page;

defineFeature(feature, (test) => {
  beforeAll(async () => {
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
  });

  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
  });

  test("The today booking", ({ given, when, and, then }) => {
    given(
      "I am on the cinema homepage and today day is chosen",
      async () => {},
    );

    when("I select the last available session", async () => {
      const sessions = await page.$$(".movie-seances__time");
      const lastSession = sessions[sessions.length - 1];
      await lastSession.evaluate((el) => el.scrollIntoView());
      await delay(500);
      await lastSession.evaluate((el) => el.click());
      await page.waitForSelector(".buying-scheme__chair_standart", {
        timeout: 10000,
      });
    });

    and("I select a standard seat", async () => {
      await clickElement(page, ".buying-scheme__chair_standart");
      await delay(1000);
    });

    and("I click the book button", async () => {
      await clickElement(page, ".acceptin-button");
    });

    then("I should see a booking confirmation", async () => {
      await page.waitForSelector(".ticket__check-title", { timeout: 10000 });
      const confirmationText = await getText(page, ".ticket__check-title");
      expect(confirmationText).toContain("Вы выбрали билеты:");
    });
  });

  test("The future booking", ({ given, when, and, then }) => {
    given("I am on the cinema homepage", async () => {});

    when("I select the last available day", async () => {
      const days = await page.$$(".page-nav__day");
      const lastDay = days[days.length - 1];
      await lastDay.evaluate((el) => el.click());
      await delay(1000);
    });

    and("I select the last available session", async () => {
      const sessions = await page.$$(".movie-seances__time");
      const lastSession = sessions[sessions.length - 1];
      await lastSession.evaluate((el) => el.scrollIntoView());
      await delay(500);
      await lastSession.evaluate((el) => el.click());
      await page.waitForSelector(".buying-scheme__chair_standart", {
        timeout: 10000,
      });
    });

    and("I select a standard seat", async () => {
      await clickElement(page, ".buying-scheme__chair_standart");
      await delay(1000);
    });

    and("I click the book button", async () => {
      await clickElement(page, ".acceptin-button");
    });

    then("I should see a booking confirmation", async () => {
      await page.waitForSelector(".ticket__check-title", { timeout: 10000 });
      const confirmationText = await getText(page, ".ticket__check-title");
      expect(confirmationText).toContain("Вы выбрали билеты:");
    });
  });

  test("Impossible to book a reserved seat", ({ given, when, and, then }) => {
    given(
      "I am on the cinema homepage and today day is chosen",
      async () => {},
    );

    when("I select the last available session", async () => {
      const sessions = await page.$$(".movie-seances__time");
      const lastSession = sessions[sessions.length - 1];
      await lastSession.evaluate((el) => el.scrollIntoView());
      await delay(500);
      await lastSession.evaluate((el) => el.click());
      await page.waitForSelector(".buying-scheme__chair_taken", {
        timeout: 10000,
      });
    });

    and("I select a reserved seat", async () => {
      await clickElement(page, ".buying-scheme__chair_taken");
      await delay(1000);
    });

    and("I click the book button", async () => {
      await clickElement(page, ".acceptin-button");
    });

    then("the book button should remain disabled", async () => {
      const isButtonDisabled = await page.$eval(
        ".acceptin-button",
        (btn) => btn.disabled,
      );
      expect(isButtonDisabled).toBe(true);
    });
  });
});
