import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class BooksService {

  private baseUrl = 'http://localhost:3000/api';
  private booksUrl = `${this.baseUrl}/books`;


  constructor(private store: Store<any>, private http: Http) { }

  getBookEntry(owner, bookId) {
    return this.http.get(`${this.booksUrl}/${owner}/books/${bookId}/entry`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBookParagraph(owner, bookId, paragraphId) {
    return this.http.get(`${this.booksUrl}/${owner}/books/${bookId}/${paragraphId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBooks(owner) {
    return this.http.get(owner ? `${this.booksUrl}/${owner}/books` : `${this.booksUrl}/all`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createBook(book) {
    return this.http.post(`${this.booksUrl}/${book.owner}/books`, book)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveParagraph(owner, bookId, data) {
    return this.http.post(`${this.booksUrl}/${owner}/books/${bookId}`, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: any) {
    const body = JSON.parse(res._body);
    return body.data || {};
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
