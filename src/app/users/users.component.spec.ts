import { of } from 'rxjs';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';

import { User } from '../shared/api/api.types';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

const getUsersMock = () => [
  ({
    id: 1,
    name: 'Stéphane',
    company: { name: 'Avine' },
    email: 'stephane@francel.com',
  } as any) as User,
];

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let loader: HarnessLoader;
  let table: MatTableHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            get: () => of(getUsersMock()),
          },
        },
      ],
      declarations: [UsersComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    table = await loader.getHarness(MatTableHarness);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display users', (done: DoneFn) => {
    table.getRows().then((rows) => {
      expect(rows).toHaveSize(1);
      done();
    });
  });
});
