import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { User } from './user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { SET_USERS, USER_INFO, CLEAR_USERS, CLEAR_USER_INFO } from './users.reducer';

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000/users';  // URL to web API
  private infoUrl = 'http://localhost:3000/user/info';  // URL to web API

  constructor(private store: Store<any>, private http: Http) { }

  getUsers() {
    const requestUsersStream = this.http.get(this.usersUrl)
      .map(this.extractData)
      .catch(this.handleError);

    return requestUsersStream.mergeMap(ev => this.getUsersInfo(ev));
  }

  getUser(userId) {
    return this.getUsers().withLatestFrom(
      users => users.filter(user => user.id === parseInt(userId))[0]
    );
  }

  getUsersInfo(users) {
    users.map(user => user.id)
    return this.http.get(`${this.infoUrl}?locationIds=${users.map(user => user.locationId)}`)
      .map((res) => this.extractDataWithInfo(res, users))
      .catch(this.handleError);
  }

  getUserInfo(locationId) {
    return this.http.get(`${this.infoUrl}?locationId=${locationId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  clearUsers() {
    this.store.dispatch({type: CLEAR_USERS })
  }

  clearUserInfo(user) {
    this.store.dispatch({ type: CLEAR_USER_INFO, payload: user })
  }

  private extractData(res: any) {
    const body = JSON.parse(res._body);
    return body.data || [];
  }

  private extractDataWithInfo(res: any, users) {
    const body = JSON.parse(res._body);
    const info = body.data || [];
    return info.map((userInfo, index) => ({...users[index], info: userInfo}))
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
