export const trackingFn = <T>(
  index: number,
  item: T & { id: number }
): number => {
  return item && item.id && typeof item.id === 'number' && !isNaN(item.id)
    ? item.id
    : index;
};
