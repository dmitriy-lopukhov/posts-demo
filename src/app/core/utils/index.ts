export const trackingFn = <T>(
  index: number,
  item: T & { id: number }
): number => {
  return (item && item.id) ?? index;
};
