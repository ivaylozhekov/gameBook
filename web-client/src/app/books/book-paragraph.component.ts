import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Book, BookContent } from './book';
import * as d3 from 'd3-hierarchy';
import { BookActions } from './book.actions';
import { getRouterParam } from 'app/utils/rootParamsHelper';
import { ActivatedRoute } from '@angular/router';

const PARAGRAPH_STATUS = {
  PRISTINE: 0,
  NEW: 1,
  READ: 2
}
@Component({
  selector: 'app-book-paragraph',
  templateUrl: './book-paragraph.component.html',
  styleUrls: ['./book-paragraph.component.scss']
})
export class BookParagraphComponent implements OnInit {
    public bookContent = {};
    private book: Book;
    @Input() bookParagraph;
    @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('chart') private chartContainer: ElementRef;
    booksStore: Observable<any>;

    constructor(private store: Store<any>, private bookActions: BookActions, private route: ActivatedRoute) {
      this.booksStore = store.select('books');
    }

    ngOnInit() {
      this.booksStore.subscribe(
        data => {
          this.bookContent = data.selectedBookContent;
          this.book = data.selectedBook;
        }
      );
    }
    // ngOnChanges(changes: any) {
    //   if (changes && changes.bookContent) {}
    // }

    proceed(id) {
      const userId = getRouterParam(this.route, 'userId');
      const bookId = getRouterParam(this.route, 'bookId');
      this.bookActions.getBookParagraph(userId, bookId, id);
    }

    reset() {
      // this.currentBookData = [{...this.bookData[0], status: PARAGRAPH_STATUS.PRISTINE}];
    }

    add() {
      this.bookParagraph.status = PARAGRAPH_STATUS.NEW;
    }

    // save(data, linkText, paragraphValue) {
    //   data.status = PARAGRAPH_STATUS.READ;
    //   const newParagraph = {
    //     content: paragraphValue,
    //     parents: [data._id],
    //     children: []
    //   }
    //   const payload = {
    //     payload: newParagraph,
    //     linkText,
    //     parentId: data._id
    //   }
    //   this.bookActions.addNewParagraph(this.book.owner, this.book.ref, payload);
      // newParagraph['status'] = PARAGRAPH_STATUS.PRISTINE;
    // }

    save(data, linkText, paragraphValue) {
        data.status = PARAGRAPH_STATUS.READ;
        this.onSave.emit({data, linkText, paragraphValue});
    }
}
