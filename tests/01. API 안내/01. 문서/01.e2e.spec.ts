import { expect, test } from "@playwright/test";

test("1. 현재 강의 API 경로를 안내한다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "강의 API" })).toBeVisible();
  await expect(page.getByText("GET /api/v1.0.2/lessons")).toBeVisible();
  await expect(page.getByText("GET /api/v1.0.2/activity")).toBeVisible();
});
