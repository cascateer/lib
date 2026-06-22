import { AsyncSubject } from "rxjs";
import { MaybePromise } from "../promise";

interface LazyPromisePredicate<Args, Result> {
  (args: Args): MaybePromise<Result>;
}

interface LazyPromiseInstance<Args, Result> {
  (predicate: LazyPromisePredicate<Args, Result>): Promise<Result>;
  run: (args: Args) => void;
}

export class LazyPromise {
  static fromFunction<Args, Result>(
    predicate: LazyPromisePredicate<Args, Result>,
  ) {
    return (function (
      predicate: LazyPromisePredicate<Args, Result>,
    ): LazyPromiseInstance<Args, Result> {
      const result = new AsyncSubject<MaybePromise<Result>>();

      return Object.assign(
        (predicate: LazyPromisePredicate<Args, Result>) =>
          new Promise<Result>((resolve, reject) =>
            result.subscribe({
              next: async (result) => resolve(await result),
              error: reject,
            }),
          ),
        {
          run: (args: Args) => {
            result.next(predicate(args));
            result.complete();
          },
        },
      );
    })(predicate);
  }

  static concatAll = async <T extends readonly unknown[]>(
    inputs: [
      ...{
        [K in keyof T]: LazyPromiseInstance<void, T[K]>;
      },
    ],
  ) => {
    for (const input of inputs) {
      await input.run();
    }

    return Promise.all(inputs);
  };
}
