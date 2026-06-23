export const dupe = <T>(items: T[]) => {
  for (const item of items) {
    if (items.indexOf(item) !== items.lastIndexOf(item)) {
      return item;
    }
  }
};
