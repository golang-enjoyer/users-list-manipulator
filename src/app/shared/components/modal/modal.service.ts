import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private showModalSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  showModal$ = this.showModalSubject.asObservable();

  openModal(): void {
    this.showModalSubject.next(true);
  }

  closeModal(): void {
    this.showModalSubject.next(false);
  }

  toggleModal(): void {
    this.showModalSubject.next(!this.showModalSubject.value);
  }
}
