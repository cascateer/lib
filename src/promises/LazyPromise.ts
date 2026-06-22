import { AsyncSubject, UnaryFunction } from "rxjs";
import { MaybePromise } from "../promise";

export class LazyPromise<Args, Result> implements PromiseLike<Result> {
  private readonly value: Promise<Result>;

  then<TResult1 = Result, TResult2 = never>(
    onfulfilled?:
      | ((value: Result) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): PromiseLike<TResult1 | TResult2> {
    return this.value.then(onfulfilled, onrejected);
  }

  run: (args: Args) => this;

  constructor(predicate: UnaryFunction<Args, MaybePromise<Result>>) {
    const result = new AsyncSubject<MaybePromise<Result>>();

    this.value = new Promise((resolve, reject) =>
      result.subscribe({
        next: async (result) => resolve(await result),
        error: reject,
      }),
    );

    this.run = (args) => {
      result.next(predicate(args));
      result.complete();

      return this;
    };
  }

  static concatAll = async <T extends readonly unknown[]>(
    inputs: [
      ...{
        [K in keyof T]: LazyPromise<void, T[K]>;
      },
    ],
  ) => {
    for (const input of inputs) {
      await input.run();
    }

    return Promise.all(inputs);
  };
}
