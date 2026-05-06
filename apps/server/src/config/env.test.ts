import { describe, expect, it } from "bun:test";
import { loadEnv } from "./env";

describe("env", () => {
  it("should parse valid env", () => {
    const env = loadEnv({
      NODE_ENV: "development",
      PORT: "3000",
    });

    expect(env.NODE_ENV).toBe("development");
    expect(env.PORT).toBe(3000);
  });

  it("should throw if NODE_ENV is invalid", () => {
    expect(() =>
      loadEnv({
        NODE_ENV: "invalid",
        PORT: "3000",
      }),
    ).toThrow();
  });

  it("should throw if PORT is not a number", () => {
    expect(() =>
      loadEnv({
        NODE_ENV: "development",
        PORT: "abc",
      }),
    ).toThrow();
  });

  it("should throw if required env is missing", () => {
    expect(() =>
      loadEnv({
        PORT: 3000,
      } as unknown as NodeJS.ProcessEnv),
    ).toThrow();
  });
});
