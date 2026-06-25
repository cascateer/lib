import { mergeAll, OperatorFunction, startWith } from "rxjs";
import { LazyPromise } from "../promises";
import { reduce } from "./reduce";

export type ActionsTransform<State, Action> = (
  state: State,
  ...actions: Action[]
) => State;

export const actions =
  <State, Action>(
    transform: ActionsTransform<State, Action>,
    seed: LazyPromise<void, State>,
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
