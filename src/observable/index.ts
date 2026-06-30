import { isObservable, Observable, ObservableInput, of } from "rxjs";

export { actions } from "./actions";
export { eventListener } from "./eventListener";
export { flatMap } from "./flatMap";
export { ProxyReplaySubject, ProxySubject } from "./ProxySubject";
export { reduce } from "./reduce";

export const asObservable = <T>(value: MaybeObservable<T>): Observable<T> =>
  isObservable(value) ? value : of(value);

export type MaybeObservable<T> = T | Observable<T>;

export type MaybeObservableInput<T> = T | ObservableInput<T>;

export type MaybeObservableInputTuple<T> = {
  [K in keyof T]: MaybeObservableInput<T[K]>;
};
