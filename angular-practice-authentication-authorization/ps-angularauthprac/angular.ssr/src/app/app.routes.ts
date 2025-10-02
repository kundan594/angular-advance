import { Routes } from '@angular/router';
import { UserSessionComponent } from './user-session/user-session.component';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseDetailComponent} from './house-detail/house-detail.component';
import {AuthService} from './Services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', component: HouseListComponent, pathMatch: 'full' },
  { path: 'user-session', component: UserSessionComponent },
  { path: 'house/:id',
    component: HouseDetailComponent,
    canActivate: [(route, state) =>
      inject(AuthService).canSeeHouseDetails()]
  },
];
