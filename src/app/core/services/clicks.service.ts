import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const storageKey = 'clicksCache';

const isLocalStorageAvailable = () => {
  const test = '__test__';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const getItem = (): number => {
  return +(localStorage.getItem(storageKey) || 0);
};

const setItem = (count: number) => {
  localStorage.setItem(storageKey, count.toString());
};

@Injectable({
  providedIn: 'root',
})
export class ClicksService {
  private clicks = new BehaviorSubject<number>(getItem());
  public readonly clicks$ = this.clicks.asObservable();

  constructor() {}

  addClick(): void {
    const count = this.clicks.getValue() + 1;
    this.clicks.next(count);
    if (isLocalStorageAvailable()) {
      setItem(count);
    }
  }
}
