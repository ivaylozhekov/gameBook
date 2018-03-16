import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { users } from './users.reducer';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersRoutingModule } from './users.routing.module';

import { UserService } from './user.service';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    StoreModule.forRoot({users})
  ],
  providers: [
    UserService
  ]
})
export class UsersModule {}
