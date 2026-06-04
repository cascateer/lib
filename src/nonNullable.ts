export const nonNullable = <T>(value: T): NonNullable<T> => {
  if (value == null) {
    throw new Error(`${value} is nil`);
  }

  return value;
};

export const nonNullableAsync = async <T>(value: T): Promise<NonNullable<T>> =>
  nonNullable(value);
