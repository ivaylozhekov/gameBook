import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Scheduler } from 'rxjs/Scheduler';
// import { SET_BOOK_CONTENT, SET_BOOK_LIST } from './book-content.reducer';
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
import { BookActions } from './book.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksStore: Observable<any>;
  private bookContent = {};
  public book: Book;
  private bookList = [];

  getBooks$ = new Subject()
    .startWith(() => Observable.empty())
    .mergeMap(ev => this.bookService.getBooks('test_user'));

  constructor(private store: Store<any>, private bookService: BooksService, private bookActions: BookActions) {
    this.booksStore = store.select('books');
    this.getBooks$.subscribe(
      bookList => this.store.dispatch(this.bookActions.setBookListAction(bookList)),
      error => {}
    );
  }

  open(book: Book) {
    this.book = book;
    this.bookActions.getBookParagraph(book.owner, book.ref, book.entry);
  }

  ngOnInit() {
    this.booksStore.subscribe(
      data => {
        this.bookContent = data.selectedBookContent;
        this.bookList = Object.keys(data.bookList).map(key => data.bookList[key]);
      }
    );
  }
}
