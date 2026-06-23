import { Function1, identity } from "lodash";

export const findDupeBy = <T>(
  items: T[],
  iteratee: Function1<T, unknown> = identity,
) =>
  items
    .map((item) => iteratee(item))
    .find((item, index, items) => index !== items.lastIndexOf(item));
