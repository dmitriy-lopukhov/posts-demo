export const trackingFn = <T>(item: T & { id: number }): number => {
  return item && item.id;
};
