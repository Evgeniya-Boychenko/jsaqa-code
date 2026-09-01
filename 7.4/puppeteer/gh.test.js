let page;

beforeAll(async () => {
  page = await browser.newPage();
});

afterAll(async () => {
  await page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub",
    );
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

describe("My tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/enterprise");
  });

  test("The Solutions button", async () => {
    const button = await page.waitForSelector(
      'button[type="button"]::-p-text(Solutions)',
      { visible: true },
    );
    await button.click();
    await page.waitForFunction(() =>
      document.body.textContent.includes("BY COMPANY SIZE"),
    );
    const pageText = await page.$eval("body", (el) => el.textContent);
    expect(pageText).toContain("BY COMPANY SIZE");
  }, 60000);

  test("The Enterprise button", async () => {
    const button = await page.waitForXPath(
      "//button[normalize-space()='Enterprise']",
      {
        visible: true,
      },
    );
    await button.click();
    await page.waitForFunction(() =>
      document.body.textContent.includes("ENTERPRISE SOLUTIONS"),
    );
    const pageText = await page.$eval("body", (el) => el.textContent);
    expect(pageText).toContain("ENTERPRISE SOLUTIONS");
  }, 60000);

  test("The Pricing button", async () => {
    const button = await page.waitForSelector("a::-p-text(Pricing)", {
      visible: true,
    });
    await button.click();
    await page.waitForFunction(() =>
      document.body.textContent.includes(
        "Try GitHub, the complete developer platform",
      ),
    );
    const pageText = await page.$eval("body", (el) => el.textContent);
    expect(pageText).toContain("Try GitHub, the complete developer platform");
  }, 60000);
});


