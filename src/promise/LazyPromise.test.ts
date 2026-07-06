import { expect, test } from "vitest";
import { LazyPromise } from "./LazyPromise";

test("LazyPromise.concatAll rejection", () =>
  LazyPromise.concatAll(
    ["apple" as const, "banana" as const, "tomato" as const].map(
      (fruit) =>
        new LazyPromise<void>(() => {
          if (fruit === "banana") {
            throw new Error(fruit);
          }
        }),
    ),
  ).catch((error) => expect(error.message).toEqual("banana")));
