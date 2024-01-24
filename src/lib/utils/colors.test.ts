import { test, expect } from "vitest";
import { getRandomHexColor } from "./colors";

test("returns any other color", () => {
  const color = "#000000";
  expect(getRandomHexColor(color)).not.toBe(color);
});
