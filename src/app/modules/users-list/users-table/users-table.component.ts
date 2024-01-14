import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { USERS_MOCK_DATA, TABLE_HEADERS } from './consts';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  tableHeaders: string[] = TABLE_HEADERS;
  users$: BehaviorSubject<User[]> = new BehaviorSubject(USERS_MOCK_DATA);

  filteredUsers$ = new BehaviorSubject<User[]>([]);
  filteredAndPaginatedUsers$ = new BehaviorSubject<User[]>([]);

  isRowHovered: boolean = false;
  currentPage: number = 1;

  readonly itemsPerPage: number = 2;

  get areIdsSelected(): boolean {
    return this.selectedUserIds.length > 0;
  }

  private selectedUserIds: number[] = [];

  private destroy$: Subject<boolean> = new Subject();

  private filterService = inject(FilterService);

  ngOnInit(): void {
    this.filterService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {
        this.updateFilteredAndPaginatedUsers(filters);
      });
  }

  applyFilters(data: User[], filters: { [key: string]: string }): User[] {
    return data.filter((item) => {
      return Object.keys(filters).every((filterKey) => {
        const filterValue = filters[filterKey];
        const itemValue = item[filterKey as keyof User];

        if (
          filterValue !== '' &&
          itemValue !== undefined &&
          itemValue !== null
        ) {
          const normalizedFilterValue = filterValue.toLowerCase();
          const normalizedItemValue = itemValue.toString().toLowerCase();

          return normalizedItemValue.includes(normalizedFilterValue);
        }

        return true;
      });
    });
  }

  getFilteredAndPaginatedUsers(dataToSlice: User[]): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return dataToSlice.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filteredAndPaginatedUsers$.next(
      this.getFilteredAndPaginatedUsers(this.filteredUsers$.value)
    );
  }

  handleCheckboxClick(userId: number): void {
    if (this.selectedUserIds.includes(userId)) {
      this.selectedUserIds = this.selectedUserIds.filter((id) => id !== userId);
    } else {
      this.selectedUserIds.push(userId);
    }
  }

  isUserSelected(userId: number): boolean {
    return this.selectedUserIds.includes(userId);
  }

  deleteSelectedRows(): void {
    this.users$.next(
      this.users$.value.filter(
        (user) => !this.selectedUserIds.includes(user.id)
      )
    );
    this.filteredUsers$.next(this.users$.value);
    this.filteredAndPaginatedUsers$.next(
      this.getFilteredAndPaginatedUsers(this.filteredUsers$.value)
    );
    this.selectedUserIds = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private updateFilteredAndPaginatedUsers(filters: {
    [key: string]: string;
  }): void {
    const filteredData = this.applyFilters(this.users$.value, filters);
    this.filteredUsers$.next(filteredData);
    this.filteredAndPaginatedUsers$.next(
      this.getFilteredAndPaginatedUsers(this.filteredUsers$.value)
    );
  }
}
