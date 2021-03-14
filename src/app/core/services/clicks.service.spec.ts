import { TestBed } from '@angular/core/testing';

import { ClicksService, isLocalStorageAvailable } from './clicks.service';

describe('ClicksService', () => {
  let service: ClicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have addClick method', () => {
    expect(service.addClick).toBeTruthy();
  });

  it('should add click', () => {
    service.addClick();
    service.clicks$.subscribe((count) => {
      expect(count).toBeGreaterThan(0);
      localStorage.clear();
    });
  });

  it('should call setItem of localStorage', () => {
    let store: Record<string, any> = {};
    const mockLocalStorage = {
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
    };

    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    service.addClick();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should not call setItem of localStorage', () => {
    const mockLocalStorage = {
      setItem: (key: string, value: string) => {
        throw new Error();
      },
    };

    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(service, 'setItem');

    service.addClick();
    expect(isLocalStorageAvailable()).toBeFalse();
    expect(service.setItem).not.toHaveBeenCalled();
  });

  it('isLocalStorageAvailable should return false if localStorage is not available ', () => {
    let store: Record<string, any> = {};
    const mockLocalStorage = {
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        throw new Error();
      },
    };

    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    expect(isLocalStorageAvailable()).toBeFalse();
  });
});
