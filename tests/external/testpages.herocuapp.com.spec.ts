import { test, expect } from "@playwright/test";

test.describe("Web testing with testpages.herokuapp.com", () => {
  test("should fill the form , sumbit it and validate the error message.", async ({
    page,
  }) => {
    await page.goto(
      "https://testpages.herokuapp.com/styled/validation/input-validation.html"
    );

    await page.locator("#firstname").fill("John");
    await page.locator("#surname").fill("Pourdanis");
    await page.locator("#age").fill("35");
    await page.locator("#country").selectOption("Greece");
    await page.locator("#notes").fill("Those are test notes");
    await page.locator('[type="submit"]').click();

    expect(
      await page.locator("[name=surnamevalidation]").innerText()
    ).toContain("Surname provided is too short");
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Input Validation/);
  });

  test("should calculate and verify the results.", async ({ page }) => {
    await page.goto("https://testpages.herokuapp.com/styled/calculator");
    /**
     * 3 + 5
     * 15 x 8
     * 132 - 256
     * 3 / 0
     */
  });

  test("should wait the timer to finish.", async ({ page }) => {
    await page.goto(
      "https://testpages.herokuapp.com/styled/javascript-countdown-test.html"
    );
    /**
     * type 10 seconds and wait the "Time up" label appear.
     */
  });
});
