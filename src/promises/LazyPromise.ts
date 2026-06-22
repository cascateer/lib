import { AsyncSubject, UnaryFunction } from "rxjs";
import { MaybePromise } from "../promise";

export class LazyPromise<Args, Result> extends Promise<Result> {
  private readonly result = new AsyncSubject<MaybePromise<Result>>();

  public readonly run: UnaryFunction<Args, this>;

  constructor(predicate: UnaryFunction<Args, MaybePromise<Result>>) {
    super((resolve, reject) =>
      this.result.subscribe({
        next: async (result) => resolve(await result),
        error: reject,
      }),
    );

    this.run = (args) => {
      this.result.next(predicate(args));
      this.result.complete();

      return this;
    };
  }

  static concatAll = async <T extends readonly unknown[]>(
    inputs: [
      ...{
        [K in keyof T]: LazyPromise<void, T[K]>;
      },
    ],
  ): Promise<T[number][]> => {
    for (const input of inputs) {
      await input.run();
    }

    return Promise.all(inputs);
  };
}
