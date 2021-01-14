import { of } from 'rxjs';

import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { TransferStateService } from './transfer-state.service';

describe('TransferStateService', () => {
  let service: TransferStateService;

  const initService = (platformId: 'browser' | 'server') => {
    TestBed.configureTestingModule({
      providers: [TransferState, { provide: PLATFORM_ID, useValue: platformId }],
    });
    service = TestBed.inject(TransferStateService);
  };

  it('should be created', () => {
    initService('browser');

    expect(service).toBeTruthy();
  });

  it('should fetch value when no state available', () => {
    initService('browser');

    const dataKey = 'DemoData';
    const dataValue = 0;

    service.get$(dataKey, of(dataValue)).subscribe((data) => {
      expect(data).toEqual(dataValue);
    });
  });

  it('should return stored value when state available', () => {
    initService('browser');

    const dataKey = 'DemoData';
    const dataValue = 0;
    const anotherValue = 1;

    TestBed.inject(TransferState).set(makeStateKey(dataKey), dataValue);

    service.get$(dataKey, of(anotherValue)).subscribe((data) => {
      expect(data).toEqual(dataValue);
    });
  });

  it('should fetch and store value when on server', () => {
    initService('server');

    const dataKey = 'DemoData';
    const dataValue = 0;
    const anotherValue = 1;

    service.get$(dataKey, of(dataValue)).subscribe((data) => {
      expect(data).toEqual(dataValue);

      const storedValue = TestBed.inject(TransferState).get(makeStateKey(dataKey), anotherValue);
      expect(storedValue).toBe(dataValue);
    });
  });
});
