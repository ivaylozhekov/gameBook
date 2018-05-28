import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from 'app/users/user-details/user-details.component';


const userDetailsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserDetailsComponent,
        children: [
          {
            path: 'books',
            loadChildren: '../../books/books.module#BooksModule',
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userDetailsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserDetailsRoutingModule { }
