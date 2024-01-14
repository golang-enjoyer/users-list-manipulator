import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { FiltersHeaderComponent } from './filters-header/filters-header.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationComponent } from './users-table/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersListComponent,
    FiltersHeaderComponent,
    UsersTableComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsersListComponent,
    
  ]
})
export class UsersListModule { }
