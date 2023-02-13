import { test, expect } from "@playwright/test";

test.describe("Login form testing", () => {
  const randomUserEmail =
    (Math.random() + 1).toString(36).substring(7) + "@mail.com";
  const randomPassword = (Math.random() + 1).toString(36).substring(7);
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      // All requests we send go to this API endpoint.
      baseURL: "http://localhost:3000",
    });
    const newUser = await apiContext.post(`/signup`, {
      data: { email: randomUserEmail, password: randomPassword },
    });
    expect(newUser.ok()).toBeTruthy();
  });

  test.afterAll(async ({}) => {
    const deleteAllUsers = await apiContext.delete(`/users`);
    expect(deleteAllUsers.ok()).toBeTruthy();
    // Dispose all responses.
    await apiContext.dispose();
  });

  test("should be able to login.", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.locator('[data-cy="login-menu"]').click();
    await page.locator("#loginEmail").fill(randomUserEmail);
    await page.locator("#loginPassword").fill(randomPassword);

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("login") && response.status() === 200
    );

    await page.locator('[data-cy="login"]').click();

    await responsePromise;
  });
});
