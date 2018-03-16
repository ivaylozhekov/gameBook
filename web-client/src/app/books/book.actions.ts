import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksService } from './books.service';
import { Action } from '../utils/action';

@Injectable()
export class BookActions {
  static GET_BOOK_PARAGRAPH = 'GET_BOOK_PARAGRAPH';
  static SET_BOOK_CONTENT = 'SET_BOOK_CONTENT';
  static SET_BOOK_LIST = 'SET_BOOK_LIST';
  static ADD_NEW_PARAGRAPH = 'ADD_NEW_PARAGRAPH';
  static NEW_PARAGRAPH_ADDED = 'NEW_PARAGRAPH_ADDED';


  constructor(private store: Store<any>, private bookService: BooksService) {}

  getBookParagraph(bookOwner, bookRef, paragraphId) {
    this.store.dispatch(this.getBookParagraphAction({ owner: bookOwner, bookId: bookRef, getBookParagraph: paragraphId }));
  }

  addNewParagraph(bookOwner, bookRef, payload) {
    this.store.dispatch(this.addNewParagraphAction({ owner: bookOwner, bookId: bookRef, data: payload }));
  }

  getBookParagraphAction(payload): Action {
    return { type: BookActions.GET_BOOK_PARAGRAPH, payload };
  }

  addNewParagraphAction(payload): Action {
    return { type: BookActions.ADD_NEW_PARAGRAPH, payload };
  }

  newParagraphAddedAction(payload) {
    return { type: BookActions.NEW_PARAGRAPH_ADDED, payload };
  }

  setBookContentAction(payload): Action {
    return { type: BookActions.SET_BOOK_CONTENT, payload };
  }

  setBookListAction(payload): Action {
    return { type: BookActions.SET_BOOK_LIST, payload };
  }
}
