import { map, OperatorFunction, scan } from "rxjs";

export const sequence =
  <Input, Output>(
    predicate: (inputs: [Input, ...Input[]], outputs: Output[]) => Output,
  ): OperatorFunction<Input, Output> =>
  (source) =>
    source.pipe(
      scan(
        ({ outputs, inputs }, input) => ({
          outputs: [predicate((inputs = [input, ...inputs] as const), outputs)],
          inputs,
        }),
        { outputs: new Array<Output>(), inputs: new Array<Input>() },
      ),
      map(({ outputs }) => {
        if (!(0 in outputs)) {
          throw new Error();
        }

        return outputs[0];
      }),
    );
