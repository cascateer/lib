export const nonNullable = <T>(value: T): NonNullable<T> => {
  if (value == null) {
    throw null;
  }

  return value;
};

export const nonNullableAsync = async <T>(value: T): Promise<NonNullable<T>> =>
  nonNullable(value);
