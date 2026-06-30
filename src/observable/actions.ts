import { map, mergeAll, OperatorFunction, startWith } from "rxjs";
import { LazyPromise } from "../promise";
import { reduce } from "./reduce";

export const actions =
  <State, Action>(
    transform: (state: State, ...actions: Action[]) => State,
    seed: LazyPromise<void, State>,
  ): OperatorFunction<LazyPromise<State, Action[]>, [Action, ...Action[]]> =>
  (source) =>
    source.pipe(
      startWith(new LazyPromise<State, Action[]>(() => [])),
      reduce(
        (result, actions) =>
          result.then(({ state }) =>
            actions.run(state).then(async (actions) => ({
              state: await transform(state, ...actions),
              actions,
            })),
          ),
        async () => ({
          state: await seed.run(),
          actions: new Array<Action>(),
        }),
      ),
      mergeAll(),
      map(({ actions }) => {
        if (0 in actions) {
          return [actions[0], ...actions.slice(1)];
        }

        throw new Error();
      }),
    );
