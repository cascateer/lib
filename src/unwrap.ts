import { sortBy } from "lodash";
import { nonNullable } from "./nonNullable";
import { property } from "./property";

export const unwrap = (text: string, start: string, end: string): string[] => [
  ...{
    *[Symbol.iterator]() {
      const startMatches = Array.from(
        text.matchAll(new RegExp(RegExp.escape(start), "g")),
        ({ index }) => ({ index, start: true }),
      );

      const endMatches = Array.from(
        text.matchAll(new RegExp(RegExp.escape(end), "g")),
        ({ index }) => ({ index, start: false }),
      );

      const indexStack = [];

      for (const match of sortBy(
        startMatches.concat(endMatches),
        property("index"),
      )) {
        if (match.start) {
          indexStack.push(match.index);
        } else {
          yield text.slice(
            nonNullable(indexStack.pop()) + start.length,
            match.index,
          );
        }
      }
    },
  },
];
