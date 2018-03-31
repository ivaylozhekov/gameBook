import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BooksService } from './books.service';
import { Action } from '../utils/action';

@Injectable()
export class BookActions {
  static GET_BOOK_PARAGRAPH = 'GET_BOOK_PARAGRAPH';
  static SET_BOOK_CONTENT = 'SET_BOOK_CONTENT';
  static GET_BOOK_LIST = 'GET_BOOK_LIST';
  static SET_BOOK_LIST = 'SET_BOOK_LIST';
  static ADD_NEW_PARAGRAPH = 'ADD_NEW_PARAGRAPH';
  static NEW_PARAGRAPH_ADDED = 'NEW_PARAGRAPH_ADDED';
  static SET_SELECTED_BOOK = 'SET_SELECTED_BOOK';
  static CREATE_BOOK = 'CREATE_BOOK';
  static BOOK_CREATED = 'BOOK_CREATED';
  static RESET_SELECTED_BOOK = 'RESET_SELECTED_BOOK';
  constructor(private store: Store<any>, private bookService: BooksService) {}

  resetSelectedBook() {
    this.store.dispatch(this.resetSelectedBookAction());
  }

  getBookList(bookOwner) {
    this.store.dispatch(this.getBookListAction({ owner: bookOwner }));
  }

  createBook(book) {
    this.store.dispatch(this.createBookAction(book));
  }

  getBookParagraph(bookOwner, bookId, paragraphId) {
    this.store.dispatch(this.getBookParagraphAction({ owner: bookOwner, bookId, getBookParagraph: paragraphId }));
  }

  addNewParagraph(bookOwner, bookId, payload) {
    this.store.dispatch(this.addNewParagraphAction({ owner: bookOwner, bookId, data: payload }));
  }

  setSelectedBook(payload) {
    this.store.dispatch(this.setSelectedBookAction(payload));
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

  getBookListAction(payload): Action {
    return { type: BookActions.GET_BOOK_LIST, payload };
  }

  createBookAction(payload): Action {
    return { type: BookActions.CREATE_BOOK, payload };
  }

  setBookListAction(payload): Action {
    return { type: BookActions.SET_BOOK_LIST, payload };
  }

  setSelectedBookAction(payload): Action {
    return { type: BookActions.SET_SELECTED_BOOK, payload };
  }

  bookCreatedAction(payload): Action {
    return { type: BookActions.BOOK_CREATED, payload };
  }

  resetSelectedBookAction() {
    return { type: BookActions.RESET_SELECTED_BOOK };
  }
}
