import { Function1, keyBy, tap } from "lodash";

export const keyMapBy = <T, U>(collection: T[], iteratee: Function1<T, U>) =>
  collection.reduce(
    (map, value) => tap(map, (map) => map.set(iteratee(value), value)),
    new Map<U, T>(),
  );

keyBy;
