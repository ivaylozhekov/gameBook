import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Scheduler } from 'rxjs/Scheduler';
import { USER_INFO, SET_USERS } from '../users.reducer';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input() users: Observable<User[]>;

  userInfoClick$ = new Subject();

  userInfo$ = this.userInfoClick$
    .mergeMap((user: User) => this.userService.getUserInfo(user.id));

  // userInfoClick$ = new Subject()
  //   .subscribe((user: User) => {
  //     this.userService.getUserInfo(user.id).subscribe(
  //       info => this.store.dispatch({ type: USER_INFO, payload: info }),
  //       error => {}
  //     );
  //   });

  clearUserInfo$ = new Subject()
    .subscribe((user: User) => {
      this.userService.clearUserInfo(user)
    });

  getUserDetails$ = new Subject()
    .subscribe((user: User) => {
      this.router.navigate(['/users', user.id]);
    });

  constructor(private store: Store<any>, private userService: UserService, private router: Router, ) {
    this.userInfo$.subscribe(
      info => this.store.dispatch({ type: USER_INFO, payload: info }),
      error => {}
    );
  }
}
