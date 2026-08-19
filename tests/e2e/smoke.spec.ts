import { test, expect, type Page } from "@playwright/test";

/**
 * AuthGate calls the backend refresh endpoint on mount. With no test backend,
 * mock it to 401 so session initialization resolves immediately (logged out).
 */
async function mockAuthGate(page: Page) {
  await page.route("**/api/v1/auth/refresh*", (route) =>
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "Unauthorized" }),
    })
  );
  await page.route("**/api/v1/auth/me*", (route) =>
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "Unauthorized" }),
    })
  );
}

test.beforeEach(async ({ page }) => {
  await mockAuthGate(page);
});

test.describe("Smoke tests", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    expect(await page.title()).toBeTruthy();
  });

  test("login page loads", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: "Login", exact: true })).toBeVisible();
  });

  test("register page loads", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("button", { name: "Create Business Account" })).toBeVisible();
  });

  test("pricing page loads", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("404 page shows for unknown routes", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
