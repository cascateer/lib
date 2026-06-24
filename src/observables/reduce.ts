import { thru } from "lodash";
import { map, OperatorFunction, scan } from "rxjs";

export const reduce =
  <Event, Result = Event>(
    predicate: (output: Result, ...events: [Event, ...Event[]]) => Result,
    seed: (event: Event) => Result,
  ): OperatorFunction<Event, Result> =>
  (source) =>
    source.pipe(
      scan(
        ({ outputs, events: previousEvents }, event) =>
          thru([event, ...previousEvents] as const, (events) => ({
            outputs: [
              0 in outputs ? predicate(outputs[0], ...events) : seed(event),
            ],
            events,
          })),
        {
          outputs: new Array<Result>(),
          events: [...new Array<Event>()] as const,
        },
      ),
      map(({ outputs }) => {
        if (0 in outputs) {
          return outputs[0];
        }

        throw new Error();
      }),
    );
