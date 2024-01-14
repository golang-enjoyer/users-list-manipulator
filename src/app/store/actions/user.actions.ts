import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const applyFilters = createAction(
  '[User] Apply Filters',
  props<{ filters: { [key: string]: string } }>()
);

export const deleteSelectedUsers = createAction(
  '[User] Delete Selected Users',
  props<{ selectedUserIds: number[] }>()
);

export const addUser = createAction(
  '[User] Added User',
  props<{ user: User }>()
);
