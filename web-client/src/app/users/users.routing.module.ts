import { BooksComponent } from './../books/books.component';
import { BookContent } from './../books/book';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';

const usersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':userId',
        loadChildren: './user-details/user-details.module#UserDetailsModule',
      }, {
        path: '',
        component: UsersComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
