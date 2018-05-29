import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Book, BookListItem } from './book';
import { d3 } from 'd3-hierarchy';

import { BookActions } from './book.actions';
import { UserService } from 'app/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getRouterParam } from 'app/utils/rootParamsHelper';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksStore: Observable<any>;
  public bookList = [];
  public newBookMode = false;
  public newBook = new BookListItem();
  private sub;
  constructor(
    private store: Store<any>,
    private bookActions: BookActions,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.booksStore = store.select('books');

    const userId = getRouterParam(route, 'userId');
    this.bookActions.getBookList(userId);
    // this.sub = route.pathFromRoot.find(path => (path.routeConfig || {}).path === ':id').params.subscribe(params => {
    //   this.bookActions.getBookList(params.id);
    // });
  }

  open(book: Book) {
    this.router.navigate([`users/${book.owner}/books/${book._id}`]);

    this.bookActions.setSelectedBook(book);
      // this.bookActions.getBookEntry(book.owner, book._id);

  }

  createBook() {
    // this.bookActions.setSelectedBook({});
    // this.bookActions.createBook('test_user');
    this.bookActions.resetSelectedBook();
    this.newBook = new BookListItem();
    this.newBook.owner = 'test_user';
    this.newBookMode = true;
  }

  saveBook() {
    this.newBookMode = false;
    this.bookActions.createBook(this.newBook);
  }

  ngOnInit() {
    this.booksStore.subscribe(
      data => {
        this.bookList = Object.keys(data.bookList).map(key => data.bookList[key]);
      }
    );
  }
}
