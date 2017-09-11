import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Scheduler } from 'rxjs/Scheduler';
import { SET_BOOK_CONTENT } from './book-content.reducer';
import { Book, BookContent } from './book';
import { BooksService } from './books.service';
import { d3 } from 'd3-hierarchy';

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
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  bookContentStore: Observable<BookContent[]>;
  private bookContent = {};

  getBook$ = new Subject()
    .startWith(() => Observable.empty())
    .mergeMap(ev => this.userService.getBook('test_user', 'UUID_1'));

  constructor(private store: Store<any>, private userService: BooksService) {
    this.bookContentStore = store.select('bookContent');

    this.getBook$.subscribe(
      bookContent => this.store.dispatch({ type: SET_BOOK_CONTENT, payload: bookContent }),
      error => {}
    );
  }

  ngOnInit() {
    this.bookContentStore.subscribe(
      data => {
        this.bookContent = data;
      }
    );
  }
}
