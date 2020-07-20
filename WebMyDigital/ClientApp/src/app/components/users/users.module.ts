import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users.routing.module';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    HttpClientModule
  ],
  providers: []
})
export class UsersModule { }
