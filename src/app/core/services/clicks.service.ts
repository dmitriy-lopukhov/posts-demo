import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const storageKey = 'clicksCache';

export function isLocalStorageAvailable() {
  const test = '__test__';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function getItem(): number {
  return +(localStorage.getItem(storageKey) || 0);
}

function setItem(count: number) {
  localStorage.setItem(storageKey, count.toString());
}

@Injectable({
  providedIn: 'root',
})
export class ClicksService {
  private clicks = new BehaviorSubject<number>(getItem());
  public readonly clicks$ = this.clicks.asObservable();
  setItem = setItem;

  constructor() {}

  addClick(): void {
    const count = this.clicks.getValue() + 1;
    this.clicks.next(count);
    if (isLocalStorageAvailable()) {
      this.setItem(count);
    }
  }
}
