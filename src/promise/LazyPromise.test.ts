import { expect, test } from "vitest";
import { LazyPromise } from "./LazyPromise";

test("LazyPromise.concatAll rejection", () =>
  expect(
    LazyPromise.concatAll([
      new LazyPromise<void>(() => {
        throw new Error("fail");
      }),
    ]),
  ).rejects.toThrow("fail"));
