import { Component, OnInit } from '@angular/core';

import { User } from '../shared/api/api.types';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users!: User[];

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.get().subscribe((users) => (this.users = users));
  }
}
