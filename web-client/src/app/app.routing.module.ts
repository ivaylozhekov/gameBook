import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from 'app/login/login.component';


const appRoutes: Routes = [
  { path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'books',
    loadChildren: './books/books.module#BooksModule'
  }, {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  }, {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
