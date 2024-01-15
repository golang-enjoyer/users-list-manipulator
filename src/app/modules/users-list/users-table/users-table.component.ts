import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil,
} from 'rxjs';
import { TABLE_HEADERS, headersToControl } from './consts';
import { User, FilterService, ModalService } from 'src/app/shared';
import { Store } from '@ngrx/store';
import {
  loadUsers,
  deleteSelectedUsers,
  applyFilters,
  filterUsersByHeader,
  alterUser,
} from 'src/app/store/actions';
import { selectUsers, selectFilteredUsers } from 'src/app/store/selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  tableHeaders: typeof TABLE_HEADERS = TABLE_HEADERS;
  store: Store = inject(Store);

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

  editUserConfiguration$: BehaviorSubject<{
    wantEdit: boolean;
    user: User | null;
  }> = new BehaviorSubject<{
    wantEdit: boolean;
    user: User | null;
  }>({
    wantEdit: false,
    user: null,
  });

  readonly itemsPerPage: number = 3;

  get areIdsSelected(): boolean {
    return this.selectedUserIds.length > 0;
  }

  private selectedUserIds: number[] = [];

  private destroy$: Subject<boolean> = new Subject();

  private filterService = inject(FilterService);

  private modalService = inject(ModalService);

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

  setEditMode(user: User): void {
    this.editUserConfiguration$.next({
      wantEdit: true,
      user: user,
    });
    this.modalService.openModal();
  }

  onModalClose(): void {
    this.resetConfiguration();
  }

  onFormSubmit(user: User): void {
    this.store.dispatch(alterUser({ user }));
    this.modalService.closeModal();
    this.resetConfiguration();
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

  filterHeader(headerName: (typeof TABLE_HEADERS)[number]) {
    const headerControl: keyof User = headersToControl[headerName];

    this.store.dispatch(filterUsersByHeader({ headerControl }));
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

  private resetConfiguration(): void {
    this.editUserConfiguration$.next({
      wantEdit: false,
      user: null,
    });
  }
}
