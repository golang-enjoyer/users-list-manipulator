import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);
export const selectFilteredUsers = createSelector(
  selectUserState,
  (state) => state.filteredUsers
);
