import { expect, test, type Page } from "@playwright/test";

const coreRoutes = [
  "/",
  "/shop",
  "/collections",
  "/about",
  "/contact",
  "/customer-care",
];

async function expectNoHorizontalOverflow(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow, `${path} has horizontal overflow`).toBeLessThanOrEqual(1);
}

test.describe("core pages", () => {
  for (const route of coreRoutes) {
    test(`${route} renders without a server error`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1").first()).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }

  test("homepage carries the demo notice and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/demo/i).first()).toBeVisible();
    for (const label of ["Shop", "Collections", "About", "Contact"]) {
      await expect(page.getByRole("navigation").getByText(label).first()).toBeVisible();
    }
  });

  test("unknown routes show a helpful 404", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/404/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /shop the collection/i }),
    ).toBeVisible();
  });
});

test.describe("shopping flow", () => {
  test("shop filters by category through the URL", async ({ page }) => {
    await page.goto("/shop?category=aso-oke");
    await expect(page.locator("article a[href^='/product/']").first()).toBeVisible();
    const count = await page.locator("article a[href^='/product/']").count();
    expect(count).toBeGreaterThan(0);
  });

  test("shop search returns a filtered result", async ({ page }) => {
    await page.goto("/shop?q=emerald");
    await expect(page.locator("article a[href^='/product/']").first()).toBeVisible();
    await expect(
      page.locator("article a[href^='/product/']").first(),
    ).toHaveAttribute("href", /adesua-emerald-lace-gown/);
  });

  test("product enquiry prefills WhatsApp with item details", async ({ page }) => {
    await page.goto("/product/adesua-emerald-lace-gown");
    await expect(
      page.getByRole("heading", { name: "Adesua Emerald Lace Gown" }),
    ).toBeVisible();
    await expect(page.getByText("₦285,000")).toBeVisible();

    await page.getByRole("button", { name: "UK 12" }).click();
    await page.getByRole("button", { name: "Colour: Emerald" }).click();

    const links = page.locator("a[href^='https://wa.me/']");
    await expect(links.first()).toBeVisible();
    const href = await links.first().getAttribute("href");
    expect(href).toBeTruthy();

    const message = decodeURIComponent(href as string);
    expect(message).toContain("Adesua Emerald Lace Gown");
    expect(message).toContain("₦285,000");
    expect(message).toContain("UK 12");
    expect(message).toContain("Emerald");
    expect(message).toContain("/product/adesua-emerald-lace-gown");
  });

  test("sold-out product offers a waitlist, not a purchase", async ({ page }) => {
    await page.goto("/product/amara-wine-tulle-gown");
    await expect(page.getByText(/waitlist/i).first()).toBeVisible();
    const href = await page
      .locator("a[href^='https://wa.me/']")
      .first()
      .getAttribute("href");
    expect(decodeURIComponent(href as string)).toContain("waitlist");
  });
});

test.describe("contact form", () => {
  test("client validation blocks an empty submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send enquiry/i }).click();
    await expect(page.getByText(/enter your full name/i)).toBeVisible();
    await expect(page.getByText(/enter a valid email address/i)).toBeVisible();
  });

  test("without a webhook, the form hands off honestly to WhatsApp", async ({
    page,
  }) => {
    test.skip(Boolean(process.env.CONTACT_WEBHOOK_URL));
    await page.goto("/contact");
    await page.getByLabel(/full name/i).fill("Ada Okafor");
    await page.getByLabel(/^email/i).fill("ada@example.com");
    await page.getByLabel(/phone/i).fill("+234 803 123 4567");
    await page.getByLabel(/message/i).fill(
      "I would like to ask about a lace gown for a wedding in August.",
    );
    // The API rejects submissions faster than this. The form timer starts on
    // mount, so a short real wait is enough.
    await page.waitForTimeout(2700);
    await page.getByRole("button", { name: /send enquiry/i }).click();

    await expect(page.getByRole("heading", { name: /one last step/i })).toBeVisible();
    await expect(page.getByText(/has not been emailed/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /send on whatsapp/i }),
    ).toBeVisible();
  });
});

test.describe("SEO and technical routes", () => {
  test("sitemap lists product pages and uses the configured host", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/product/adesua-emerald-lace-gown");
  });

  test("robots blocks the studio and advertises the sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain("Disallow: /studio");
    expect(body).toContain("Sitemap:");
  });

  test("Open Graph image responds with a PNG", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("revalidation webhook is guarded when no secret is configured", async ({
    request,
  }) => {
    test.skip(Boolean(process.env.SANITY_REVALIDATE_SECRET));
    const response = await request.post("/api/revalidate");
    expect(response.status()).toBe(503);
  });
});

test.describe("responsive layout", () => {
  for (const width of [390, 768, 1280, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of coreRoutes) {
        await expectNoHorizontalOverflow(page, route);
      }
      await expectNoHorizontalOverflow(
        page,
        "/product/adesua-emerald-lace-gown",
      );
    });
  }
});
