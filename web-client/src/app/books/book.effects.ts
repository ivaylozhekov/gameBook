import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { BooksService } from './books.service';
import { BookActions } from './book.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Action } from '../utils/action';

@Injectable()
export class BookEffects {

    @Effect() getBookParagraph$ = this.actions$
    .ofType('GET_BOOK_PARAGRAPH')
    .map((action: Action) => action.payload)
    .mergeMap((payload: any) => this.bookService.getBookParagraph(payload.owner, payload.bookId, payload.getBookParagraph)
        .map(bookContent => this.bookActions.setBookContentAction(bookContent))
        .catch(() => of({ type: 'GENERAL_ERROR' }))
    );

    @Effect() addNewParagraph$ = this.actions$
    .ofType('ADD_NEW_PARAGRAPH')
    .map((action: Action) => action.payload)
    .mergeMap((payload: any) => this.bookService.saveParagraph(payload.owner, payload.bookId, payload.data)
        .map(data => this.bookActions.newParagraphAddedAction(data))
        .catch(() => of({ type: 'GENERAL_ERROR' }))
    );

    @Effect() getBookList$ = this.actions$
    .ofType('GET_BOOK_LIST')
    .map((action: Action) => action.payload)
    .mergeMap((payload: any) => this.bookService.getBooks(payload.owner)
        .map(data => this.bookActions.setBookListAction(data))
        .catch(() => of({ type: 'GENERAL_ERROR' }))
    );

    @Effect() createBook$ = this.actions$
    .ofType('CREATE_BOOK')
    .map((action: Action) => action.payload)
    .mergeMap(payload => this.bookService.createBook(payload)
        .map(data => this.bookActions.bookCreatedAction(data))
        .catch(() => of({ type: 'GENERAL_ERROR' }))
    );

    constructor(
        private bookService: BooksService,
        private actions$: Actions,
        private bookActions: BookActions
    ) { }
}
