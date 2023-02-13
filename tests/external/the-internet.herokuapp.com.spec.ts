import { test, expect } from "@playwright/test";

test.describe("Web testing with the-internet.herokuapp.com", () => {
  test("should check the heading text.", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/");

    expect(await page.locator(".heading").innerText()).toContain(
      "Welcome to the-internet"
    );
  });

  test("should add an element to page.", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/add_remove_elements/");

    await page.getByText("Add Element").click();
    expect(page.locator(".added-manually").isVisible).toBeTruthy();
  });

  test("should add 3 elements to page.", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/add_remove_elements/");
    const numberOfElements = 3;
    for (let i = 0; i < numberOfElements; i++) {
      await page.getByText("Add Element").click();
    }
    expect(await page.locator(".added-manually").count()).toEqual(
      numberOfElements
    );
  });

  test("should add 3 elements and then remove 2.", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/add_remove_elements/");
    /**
     * your code here
     */
  });

  test("should check the first checkbox.", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/checkboxes");

    await page.locator("input").first().check();
    expect(await page.locator("input").first().isChecked()).toBeTruthy();
  });

  test("should wait the element to disappear.", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/dynamic_controls");

    await page.locator('#checkbox-example [type="button"]').click();

    await expect(page.locator("#checkbox")).toBeHidden({ timeout: 5000 });
  });

  test("should login and verify that you are in a secure area.", async ({
    page,
  }) => {
    await page.goto("http://the-internet.herokuapp.com/login");
    /**
     * your code here
     */
  });

  test("should wait and verify that response status is 200", async ({
    page,
  }) => {
    await page.goto("http://the-internet.herokuapp.com/status_codes");

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/status_codes/200") &&
        response.status() === 200
    );
    await page.locator('a[href="status_codes/200"]').click();
    const response = await responsePromise;
  });

  test("should wait and verify that response status is 404", async ({
    page,
  }) => {
    await page.goto("http://the-internet.herokuapp.com/status_codes");
    /**
     * your code here
     */
  });

  test("should sort by due on the example 1 table", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/tables");
    await page.locator("#table1").getByText("Due").click();
    const tableRow = await page.locator("#table1 tr").allInnerTexts();
    expect(tableRow[1]).toContain("$50.00");
    expect(tableRow[2]).toContain("$50.00");
    expect(tableRow[3]).toContain("$51.00");
    expect(tableRow[4]).toContain("$100.00");
  });

  test("should sort by first name on the example 2 table", async ({ page }) => {
    await page.goto("http://the-internet.herokuapp.com/tables");
    /**
     * your code here
     */
  });
});
