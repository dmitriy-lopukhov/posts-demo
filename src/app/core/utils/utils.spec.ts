import { trackingFn } from '.';

const testItem: Parameters<typeof trackingFn>[1] = {
  id: 123,
};

describe('Utils', () => {
  it('trackingFn should return id as index', () => {
    expect(trackingFn(1, testItem) === 123).toBeTruthy();
  });

  it('trackingFn should return index', () => {
    expect(trackingFn(5, {} as any) === 5).toBeTruthy();
  });
});
