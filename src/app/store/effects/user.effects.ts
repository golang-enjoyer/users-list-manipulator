import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from 'src/app/shared';

@Injectable()
export class UserEffects {
  private actions$: Actions = inject(Actions);
  private userService: UserService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService
          .getUsers()
          .pipe(map((users) => UserActions.loadUsersSuccess({ users })))
      )
    )
  );
}
