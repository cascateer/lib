import { Function1, identity } from "lodash";

export const findDupeBy = <T, U>(
  items: T[],
  iteratee: Function1<T, U> = identity,
): U | undefined =>
  items
    .map((item) => iteratee(item))
    .find((item, index, items) => index !== items.lastIndexOf(item));
