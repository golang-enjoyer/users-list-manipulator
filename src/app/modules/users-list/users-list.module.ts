import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { FiltersHeaderComponent } from './filters-header/filters-header.component';
import { FilterInputComponent } from './filters-header/filter-input/filter-input.component';
import { UsersTableComponent } from './users-table/users-table.component';



@NgModule({
  declarations: [
    UsersListComponent,
    FiltersHeaderComponent,
    FilterInputComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsersListComponent,
    
  ]
})
export class UsersListModule { }
