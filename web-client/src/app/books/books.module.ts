import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { books } from './books.reducer';
import { BooksRoutingModule } from './books.routing.module';

import { BooksService } from './books.service';
import { BooksComponent } from './books.component';
import { BookContentComponent } from './book-content.component';
import { BookEffects } from './book.effects';
import { EffectsModule } from '@ngrx/effects';
import { BookActions } from './book.actions';

@NgModule({
  declarations: [
    BooksComponent,
    BookContentComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forRoot({books}),
    EffectsModule.forRoot([BookEffects])
  ],
  providers: [
    BooksService,
    BookActions
  ]
})
export class BooksModule {}
