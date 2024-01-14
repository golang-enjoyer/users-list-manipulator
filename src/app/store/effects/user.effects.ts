import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

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
