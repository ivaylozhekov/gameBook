import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Book } from './book';
import { d3 } from 'd3-hierarchy';

import { BookActions } from './book.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksStore: Observable<any>;
  public bookList = [];

  constructor(private store: Store<any>, private bookActions: BookActions) {
    this.booksStore = store.select('books');
    this.bookActions.getBookList('test_user');
  }

  open(book: Book) {
    this.bookActions.setSelectedBook(book);
    this.bookActions.getBookParagraph(book.owner, book.ref, book.entry);
  }

  ngOnInit() {
    this.booksStore.subscribe(
      data => {
        this.bookList = Object.keys(data.bookList).map(key => data.bookList[key]);
      }
    );
  }
}
