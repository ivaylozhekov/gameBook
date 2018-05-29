import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { BookContentComponent } from './book-content.component';

const booksRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BooksComponent,
        children: [
          {
            path: ':bookId',
            component: BookContentComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(booksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BooksRoutingModule { }
