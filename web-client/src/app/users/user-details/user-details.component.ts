import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { UPDATE_USER } from '../users.reducer';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';



@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  private user;
  private users;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store<any>
  ) {
    this.users = store.select('users');
    this.route.paramMap
    .combineLatest(this.users, (stream2Value, stream1Value) => [stream2Value, stream1Value])
      .subscribe(([params, data]: [any, [User]]) => {
        this.user = data ? data.filter(user => user.id === parseInt(params.get('id')))[0] : null
      });
  }
  updateUeser(country, capital) {
    this.store.dispatch({ type: UPDATE_USER, payload: {
      id: this.user.id,
      info: { country, capital}
    }});
  }
}
