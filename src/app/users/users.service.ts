import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from '../shared/api/api.service';
import { User } from '../shared/api/api.types';
import { TransferStateService } from '../shared/transfer-state/transfer-state.service';
import { AppStateKey } from '../shared/transfer-state/transfer-state.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private readonly apiService: ApiService,
    private readonly transferStateService: TransferStateService
  ) {}

  get(): Observable<User[]> {
    return this.transferStateService.get$(AppStateKey.Users, this.apiService.getUsers());
  }
}
