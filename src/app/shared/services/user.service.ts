import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/shared';
import { USERS_MOCK_DATA } from './consts';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers(): Observable<User[]> {
    return of(USERS_MOCK_DATA).pipe(delay(500));
  }
}
