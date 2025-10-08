import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserApi } from '../api/user.api';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../models/user';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userApi: UserApi;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: UserApi,
          useValue: {
            getAllUsers: jest.fn(),
            searchUser: jest.fn()
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userApi = TestBed.get(UserApi);
  });

  it('can search user by first name', () => {
    const user: User = { first: 'Rishabh', id: '23' };
    const users = [user];
    const response$ = cold('-----a|', { a: users });
    userApi.searchUser = jest.fn(() => response$);
    component.search('Rishabh');
    getTestScheduler().flush();
    expect(component.users).toEqual(users);
  });

  // Testing for RACE Condition
  xit('can search user in proper sequence', () => {
    userApi.searchUser = jest.fn(() =>
      cold('--------a|', { a: [{ first: 'John' }] })
    );
    component.search('John');

    userApi.searchUser = jest.fn(() =>
      cold('--b|', { b: [{ first: 'Sean' }] })
    );
    component.search('Sean');

    getTestScheduler().flush();
    expect(component.users).toEqual([{ first: 'Sean' }]);
  });

  // Fixing RACE Condition
  it('can search user in proper sequence', () => {
    userApi.searchUser = jest.fn(() =>
      cold('--------a|', { a: [{ first: 'John' }] })
    );
    component.onKeyup('John');

    userApi.searchUser = jest.fn(() =>
      cold('--b|', { b: [{ first: 'Sean' }] })
    );
    component.onKeyup('Sean');
    getTestScheduler().flush();
    expect(component.users).toEqual([{ first: 'Sean' }]);
  });
});
