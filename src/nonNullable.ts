export const nonNullable = <T>(value: T): NonNullable<T> => {
  if (value == null) {
    throw null;
  }

  return value;
};
