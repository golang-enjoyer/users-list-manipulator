import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User, ModalService } from 'src/app/shared';
import { addUser } from 'src/app/store/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  userForm!: FormGroup;
  isModalOpened: boolean = false;

  private modalService: ModalService = inject(ModalService);
  private store: Store = inject(Store);

  toggleModal(): void {
    this.isModalOpened = true;
    this.modalService.openModal();
  }

  onModalClose(): void {
    this.isModalOpened = false;
  }

  onFormSubmit(user: User): void {
    this.isModalOpened = false;
    this.modalService.closeModal();
    this.store.dispatch(addUser({ user }));
  }
}
