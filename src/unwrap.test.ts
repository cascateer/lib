import { expect, test } from "vitest";
import { unwrap } from "./unwrap";

test("unwrap", () => {
  const cases = [
    {
      text: "12 ((foo ((bar)) xxx))yyy",
      start: "((",
      end: "))",
      result: ["bar", "foo ((bar)) xxx"],
    },
    {
      text: "${aaaa${bb${cccccc${dd}cc${ee}ccc}bb}aaaa}",
      start: "${",
      end: "}",
      result: [
        "dd",
        "ee",
        "cccccc${dd}cc${ee}ccc",
        "bb${cccccc${dd}cc${ee}ccc}bb",
        "aaaa${bb${cccccc${dd}cc${ee}ccc}bb}aaaa",
      ],
    },
  ];

  for (const { text, start, end, result } of cases) {
    expect(unwrap(text, start, end)).toEqual(result);
  }
});
