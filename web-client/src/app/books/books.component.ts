import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Scheduler } from 'rxjs/Scheduler';
import { SET_BOOK_CONTENT, SET_BOOK_LIST } from './book-content.reducer';
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
  bookContentStore: Observable<any>;
  private bookContent = {};
  public bookRef: string;
  private bookList = [];
  private getBookSubject: Subject<any> = new Subject()
  getBook$ = this.getBookSubject.mergeMap((ev: any) => this.bookService.getBookParagraph('test_user', ev.bookId, ev.getBookParagraph));

  getBooks$ = new Subject()
    .startWith(() => Observable.empty())
    .mergeMap(ev => this.bookService.getBooks('test_user'));

  constructor(private store: Store<any>, private bookService: BooksService) {
    this.bookContentStore = store.select('bookContent');

    this.getBook$.subscribe(
      bookContent => this.store.dispatch({ type: SET_BOOK_CONTENT, payload: bookContent }),
      error => {}
    );

    this.getBooks$.subscribe(
      bookList => this.store.dispatch({ type: SET_BOOK_LIST, payload: bookList }),
      error => {}
    );
  }

  open(book) {
    this.bookRef = book.ref;
    this.getBookSubject.next({bookId: book.ref, getBookParagraph: book.entry})
  }

  ngOnInit() {
    this.bookContentStore.subscribe(
      data => {
        this.bookContent = data.selectedBookContent;
        this.bookList = Object.keys(data.bookList).map(key => data.bookList[key]);
      }
    );
  }
}
