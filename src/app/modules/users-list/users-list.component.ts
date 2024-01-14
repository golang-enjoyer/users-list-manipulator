import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
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

  onSubmit(): void {
    this.modalService.closeModal();

    this.store.dispatch(addUser({ user: this.userForm.value }));
    this.userForm.reset();
  }

  toggleModal(): void {
    this.modalService.openModal();
  }

  get registrationDateControl() {
    return this.userForm.get('registrationDate');
  }

  get fullNameControl() {
    return this.userForm.get('fullName');
  }

  get positionControl() {
    return this.userForm.get('position');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  get passwordControl() {
    return this.userForm.get('password');
  }

  get phoneNumberControl() {
    return this.userForm.get('phoneNumber');
  }
}
