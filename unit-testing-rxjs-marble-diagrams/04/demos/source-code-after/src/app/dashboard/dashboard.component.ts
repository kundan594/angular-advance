import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApi } from '../api/user.api';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  searchTearm$ = new Subject<string>();
  subscription: Subscription;
  users = [];
  constructor(private userApi: UserApi) {
    this.subscription = this.searchTearm$
      .pipe(switchMap(first => this.userApi.searchUser(first)))
      .subscribe(users => (this.users = users));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onKeyup(first: string) {
    this.searchTearm$.next(first);
  }

  search(first: string) {
    this.userApi.searchUser(first).subscribe(users => (this.users = users));
  }
}
