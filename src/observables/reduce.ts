import assert from "assert";
import { map, OperatorFunction, scan } from "rxjs";

export const reduce =
  <Result, Event>(
    predicate: (outputs: Result, ...events: [Event, ...Event[]]) => Result,
    seed: (event: Event) => Result,
  ): OperatorFunction<Event, Result> =>
  (source) =>
    source.pipe(
      scan(
        ({ outputs, events }, event) => ({
          outputs: [
            predicate(
              0 in outputs ? outputs[0] : seed(event),
              ...(events = [event, ...events] as const),
            ),
          ],
          events,
        }),
        { outputs: new Array<Result>(), events: new Array<Event>() },
      ),
      map(({ outputs }) => (assert(0 in outputs), outputs[0])),
    );
