
import { NgModule } from '@angular/core';
import {PhoneFormatPipe} from './pipes/phote-format.pipe';
import { PasswordHidePipe } from './pipes/password-hide.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { phoneNumberValidator } from './validators/phone-number.validator';

@NgModule({
  declarations: [PhoneFormatPipe, PasswordHidePipe, ModalComponent],
  imports: [CommonModule],
  exports: [PhoneFormatPipe, PasswordHidePipe, ModalComponent]
})
export class SharedModule { }