import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filtersSubject: BehaviorSubject<{
    [key: string]: string;
  }> = new BehaviorSubject<{ [key: string]: string }>({});
  public filters$: Observable<{
    [key: string]: string;
  }> = this.filtersSubject.asObservable();

  updateFilters(filters: { [key: string]: string }): void {
    this.filtersSubject.next(filters);
  }

  clearFilters(): void {
    this.filtersSubject.next({});
  }
}
