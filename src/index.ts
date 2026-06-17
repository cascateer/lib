import { UnaryFunction } from "rxjs";
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
export { ExtendableDictionary, type Extend } from "./ExtendableDictionary";
export { keys } from "./keys";
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
export { randomString } from "./randomString";
export { split } from "./split";

export type EndoFunction<T> = UnaryFunction<T, T>;

export type AsyncEndoFunction<T> = UnaryFunction<T, MaybePromise<T>>;

export type EndoFunctionOperator<T, U> = UnaryFunction<
  EndoFunction<T>,
  EndoFunction<U>
>;
