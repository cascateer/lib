import { Function1 } from "lodash";
import { MaybePromise } from "./promise";

export { asArray, type MaybeArray } from "./array";
export { chunkWith } from "./chunkWith";
export { createElement } from "./createElement";
export {
  asEnumerable,
  type Enumerable,
  type EnumerableItem,
  type Enumerator,
} from "./Enumerable";
export { envConfig } from "./envConfig";
export { findDupeBy } from "./findDupeBy";
export { asFunction, type MaybeFunction } from "./function";
export { keyMapBy } from "./keyMapBy";
export { keys } from "./keys";
export { LazyDictionary, type Extend } from "./LazyDictionary";
export { nonNullable, nonNullableAsync } from "./nonNullable";
export { nthArg } from "./nthArg";
export {
  asObservable,
  type MaybeObservable,
  type MaybeObservableInput,
  type MaybeObservableInputTuple,
} from "./observable";
export { type MaybePromise } from "./promise";
export { property } from "./property";
export { Serializable, Serializer } from "./serializable";
export { Snippet } from "./Snippet";
export { split } from "./split";

export type EndoFunction<T> = Function1<T, T>;

export type AsyncEndoFunction<T> = Function1<T, MaybePromise<T>>;

export type EndoFunctionOperator<T, U> = Function1<
  EndoFunction<T>,
  EndoFunction<U>
>;
