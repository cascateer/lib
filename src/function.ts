import { constant, Function1, isFunction } from "lodash";

export type MaybeFunction<Args, Result> = Function1<Args, Result> | Result;

export const asFunction = <Args, Result>(
  func: MaybeFunction<Args, Result>,
): Function1<Args, Result> => (isFunction(func) ? func : constant(func));
