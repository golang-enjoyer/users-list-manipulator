import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/shared';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number.validator';
import { addUser } from 'src/app/store/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userForm!: FormGroup;
  private modalService = inject(ModalService);
  private fb = inject(FormBuilder);
  private store = inject(Store);

  isModalOpened = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      ID: [],
      registrationDate: ['', Validators.required],
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: [
        '',
        Validators.compose([Validators.required, phoneNumberValidator()]),
      ],
    });
  }

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
