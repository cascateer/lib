import { mergeAll, OperatorFunction, startWith } from "rxjs";
import { LazyPromise } from "../promises";
import { reduce } from "./reduce";

export const actions =
  <State, Action>(
    seed: LazyPromise<void, State>,
    transform: (state: State, ...actions: Action[]) => State,
  ): OperatorFunction<LazyPromise<State, Action[]>, State> =>
  (source) =>
    source.pipe(
      startWith(new LazyPromise<State, Action[]>(() => [])),
      reduce(
        (state, actionCreator) =>
          state.then((state) =>
            actionCreator
              .run(state)
              .then((actions) => transform(state, ...actions)),
          ),
        async () => seed.run(),
      ),
      mergeAll(),
    );
