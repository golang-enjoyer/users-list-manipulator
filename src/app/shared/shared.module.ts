import { NgModule } from '@angular/core';
import { PhoneFormatPipe } from './pipes/phote-format.pipe';
import { PasswordHidePipe } from './pipes/password-hide.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PhoneFormatPipe,
    PasswordHidePipe,
    ModalComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    PhoneFormatPipe,
    PasswordHidePipe,
    ModalComponent,
    UserFormComponent,
  ],
})
export class SharedModule {}
