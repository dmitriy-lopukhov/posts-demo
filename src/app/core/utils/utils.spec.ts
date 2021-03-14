import { trackingFn } from '.';

const testItem: Parameters<typeof trackingFn>[1] = {
  id: 123,
};
const index = 5;

describe('Utils: trackingFn', () => {
  it('trackingFn should return id as index', () => {
    expect(trackingFn(index, testItem) === 123).toBeTruthy();
  });

  it('trackingFn should return index', () => {
    expect(trackingFn(index, {} as any)).toBe(index);
  });

  it('trackingFn should return index if id === NaN', () => {
    expect(trackingFn(index, { id: NaN })).toBe(index);
  });

  it('trackingFn should return index if id === null', () => {
    expect(trackingFn(index, { id: null } as any)).toBe(index);
  });
});
