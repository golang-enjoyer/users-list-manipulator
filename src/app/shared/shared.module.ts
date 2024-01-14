
import { NgModule } from '@angular/core';
import {PhoneFormatPipe} from './pipes/phote-format.pipe';
import { PasswordHidePipe } from './pipes/password-hide.pipe';

@NgModule({
  declarations: [PhoneFormatPipe, PasswordHidePipe],
  exports: [PhoneFormatPipe, PasswordHidePipe]
})
export class SharedModule { }