import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Scheduler } from 'rxjs/Scheduler';
import { USER_INFO, SET_USERS } from './users.reducer';
import { User } from './user';
import { UserService } from './user.service';

import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: Observable<User[]>;

  getUsersClicks$ = new Subject();

  getUsersWithClicks$ = this.getUsersClicks$
    .startWith(() => Observable.empty())
    .mergeMap(ev => this.userService.getUsers());

  clearUsersClicks$ = new Subject()
    .subscribe(() => {
      this.userService.clearUsers();
    });

  constructor(private store: Store<any>, private userService: UserService) {
    this.users = store.select('users');

    this.getUsersWithClicks$.subscribe(
      users =>  this.store.dispatch({ type: SET_USERS, payload: users }),
      error => {}
    );
  }

  // ngOnInit() {
  //   this.userService.getUsers().subscribe(
  //     users =>  this.store.dispatch({ type: SET_USERS, payload: users }),
  //     error => {}
  //   );
  // }
}
