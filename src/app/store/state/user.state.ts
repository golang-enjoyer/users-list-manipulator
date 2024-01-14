import { User } from 'src/app/shared';

export interface UserState {
  users: User[] | null;
  filteredUsers: User[] | null;
}

export const initialState: UserState = {
  users: null,
  filteredUsers: null,
};
