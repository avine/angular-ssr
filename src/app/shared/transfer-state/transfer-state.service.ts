import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TransferStateService {
  private readonly isPlatformServer = isPlatformServer(this.platformId);
  private readonly isPlatformBrowser = !this.isPlatformServer;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly transferState: TransferState
  ) {}

  get$<T>(key: string, value$: Observable<T>): Observable<T> {
    const value = this.getOnBrowser<T>(key);
    if (value) {
      return of(value);
    }
    return value$.pipe(tap((val) => this.setOnServer(key, val)));
  }

  private getOnBrowser<T>(key: string): T | null {
    if (this.isPlatformServer || !this.hasKey(makeStateKey(key))) {
      return null;
    }
    const value = this.transferState.get<T>(makeStateKey(key), null as any as T) as T;
    this.remove(key);
    return value;
  }

  private setOnServer<T>(key: string, value: T): void {
    if (this.isPlatformBrowser) {
      return;
    }
    if (this.hasKey(makeStateKey(key))) {
      console.warn('TransferStateService.setOnServer: has been called twice for the same key', key);
    }
    this.transferState.set<T>(makeStateKey<T>(key), value);
  }

  private hasKey(key: string): boolean {
    return this.transferState.hasKey(makeStateKey(key));
  }

  private remove(key: string): void {
    this.transferState.remove(makeStateKey(key));
  }
}
