import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideStore } from '@ngrx/store';
import { bookContent } from './book-content.reducer';
import { BooksRoutingModule } from './books.routing.module';

import { BooksService } from './books.service';
import { BooksComponent } from './books.component';
import { BookContentComponent } from './book-content.component';


@NgModule({
  declarations: [
    BooksComponent,
    BookContentComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ],
  providers: [
    provideStore({bookContent}),
    BooksService
  ]
})
export class BooksModule {}
