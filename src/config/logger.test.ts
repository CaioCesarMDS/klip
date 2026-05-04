import { describe, expect, it } from "bun:test";
import { logger } from "./logger";

describe("logger", () => {
  it("should have correct level", () => {
    if (process.env.NODE_ENV === "development") {
      expect(logger.level).toBe("debug");
    } else {
      expect(logger.level).toBe("info");
    }
  });
});
