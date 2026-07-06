import { once } from "lodash";
import {
  AsyncSubject,
  identity,
  mergeAll,
  OperatorFunction,
  startWith,
  UnaryFunction,
} from "rxjs";
import { MaybePromise } from ".";
import { reduce } from "../observable";
import { property } from "../property";

export class LazyPromise<Args, Result = Args> {
  private readonly resultSubject = new AsyncSubject<MaybePromise<Result>>();

  public readonly result = new Promise<Result>((resolve, reject) =>
    this.resultSubject.subscribe({
      next: async (result) => resolve(await result),
      error: reject,
    }),
  );

  then = this.result.then;
  catch = this.result.catch;
  finally = this.result.finally;

  start: (args: Args) => Promise<Result>;

  constructor(predicate: UnaryFunction<Args, MaybePromise<Result>>) {
    this.start = once((args) => {
      this.resultSubject.next(predicate(args));
      this.resultSubject.complete();

      return this.result;
    });
  }

  static concatAll = async <T extends readonly unknown[]>(
    inputs: [
      ...{
        [K in keyof T]: LazyPromise<void, T[K]>;
      },
    ],
  ) => {
    for (const input of inputs) {
      await input.start().catch();
    }

    return Promise.all(inputs.map(property("result")));
  };

  static reduce =
    <T>(seed: LazyPromise<void, T>): OperatorFunction<LazyPromise<T>, T> =>
    (source) =>
      source.pipe(
        startWith(new LazyPromise<T, T>(identity)),
        reduce(
          (value, { start }) => value.then(start),
          async () => seed.start(),
        ),
        mergeAll(),
      );
}
