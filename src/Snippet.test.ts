import { expect, test } from "vitest";
import { Snippet } from "./Snippet";

test("Snippet.parse", () => {
  expect(Snippet.parse({ name: "abc" }, "$.name")).toEqual("abc");
  expect(Snippet.parse({ name: "abacab" }, "$.name/^(a)(ba)/$1")).toEqual(
    "acab",
  );
});

test("Snippet.parseAll", () => {
  expect(Snippet.parseAll({ name: "Alba" }, "${$.name}tros")).toEqual(
    "Albatros",
  );
  expect(
    Snippet.parseAll(
      { name: "Aalbaaa" },
      "${${$.name/(a+)/a/gi}tros/(al|ba)/$1-/g}",
    ),
  ).toEqual("al-ba-tros");
});
