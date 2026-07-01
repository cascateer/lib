import { Function1, Function3, keyBy, tap } from "lodash";

export const keyMapBy = <T, K, V>(
  collection: T[],
  keyIteratee: Function1<T, K>,
  valueIteratee: Function3<T, number, Map<K, V>, V>,
) =>
  collection.reduce(
    (map, item, index) =>
      tap(map, (map) =>
        map.set(keyIteratee(item), valueIteratee(item, index, map)),
      ),
    new Map<K, V>(),
  );

keyBy;
