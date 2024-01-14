import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<{ [key: string]: string }>({});
  public filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: { [key: string]: string }): void {
    this.filtersSubject.next(filters);
  }

  clearFilters(): void {
    this.filtersSubject.next({});
  }
}
