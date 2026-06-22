import { partialRight } from "lodash";
import {
  AsyncSubject,
  defer,
  lastValueFrom,
  mergeAll,
  of,
  toArray,
  UnaryFunction,
} from "rxjs";
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

  static mergeAll<T extends readonly unknown[]>(
    inputs: [
      ...{
        [K in keyof T]: UnaryFunction<void, LazyPromise<void, T[K]>>;
      },
    ],
    concurrent = 1,
  ): Promise<T[number][]> {
    return lastValueFrom(
      of(...inputs.map((input) => defer(async () => input()))).pipe(
        mergeAll(concurrent),
        toArray(),
      ),
    );
  }

  static concatAll = partialRight(this.mergeAll, 1);
}
