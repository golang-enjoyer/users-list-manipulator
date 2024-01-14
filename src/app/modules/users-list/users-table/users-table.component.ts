import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { TABLE_HEADERS } from './consts';
import { User } from 'src/app/shared';
import { Store } from '@ngrx/store';
import {
  loadUsers,
  deleteSelectedUsers,
  applyFilters,
} from 'src/app/store/actions';
import { selectUsers, selectFilteredUsers } from 'src/app/store/selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  tableHeaders: string[] = TABLE_HEADERS;
  store = inject(Store);

  users$: Observable<User[] | null> = this.store.select(selectUsers);

  filteredUsers$: Observable<User[] | null> =
    this.store.select(selectFilteredUsers);

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  filteredAndPaginatedUsers$: Observable<User[]> = combineLatest([
    this.filteredUsers$,
    this.currentPage$,
  ]).pipe(
    map(([filteredUsers, currentPage]) =>
      this.getFilteredAndPaginatedUsers(filteredUsers, currentPage)
    )
  );

  isRowHovered: boolean = false;

  readonly itemsPerPage: number = 3;

  get areIdsSelected(): boolean {
    return this.selectedUserIds.length > 0;
  }

  private selectedUserIds: number[] = [];

  private destroy$: Subject<boolean> = new Subject();

  private filterService = inject(FilterService);

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    this.filterService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filters) => {
        this.updateFilteredAndPaginatedUsers(filters);
      });
  }

  getFilteredAndPaginatedUsers(
    dataToSlice: User[] | null,
    currentPage: number
  ): User[] {
    if (!dataToSlice) return [];

    const startIndex = (currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return dataToSlice.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage$.next(page);
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
    this.store.dispatch(
      deleteSelectedUsers({ selectedUserIds: this.selectedUserIds })
    );

    this.currentPage$.next(1);

    this.selectedUserIds = [];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private updateFilteredAndPaginatedUsers(filters: {
    [key: string]: string;
  }): void {
    this.currentPage$.next(1);
    this.store.dispatch(applyFilters({ filters }));
  }
}
