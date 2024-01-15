import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number.validator';
import { User } from '../../interfaces';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user!: User | null;

  @Output() formSubmitted: EventEmitter<User> = new EventEmitter<User>();

  userForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      id: [],
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

    if (this.user) {
      this.userForm.patchValue({ ID: this.user.id, ...this.user });
    }
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.userForm.value);
    this.userForm.reset();
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
