import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
