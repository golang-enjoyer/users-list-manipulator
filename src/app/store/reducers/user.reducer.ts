import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from 'src/app/shared';
import { initialState } from '../state/user.state';

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    filteredUsers: users,
  })),
  on(UserActions.applyFilters, (state, { filters }) => ({
    ...state,
    filteredUsers:
      state?.users &&
      state.users.filter((item) => {
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
      }),
  })),
  on(UserActions.deleteSelectedUsers, (state, { selectedUserIds }) => ({
    ...state,
    users:
      state?.users &&
      state.users.filter((user) => !selectedUserIds.includes(user.id)),
    filteredUsers:
      state.filteredUsers &&
      state.filteredUsers.filter((user) => !selectedUserIds.includes(user.id)),
  })),
  on(UserActions.addUser, (state, { user }) => {
    console.log(user);
    const newId =
      state.users && state.users.length > 0
        ? Math.max(...state.users!.map((u) => u.id)) + 1
        : 1;
    const newUser = { ...user, id: newId };
    return {
      ...state,
      users: [...state.users!, newUser],
      filteredUsers: [...state.filteredUsers!, newUser], // You might need to update filteredUsers if needed
    };
  })
);
