import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const phoneNumberPattern = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;
    const isValid = phoneNumberPattern.test(control.value);

    return isValid ? null : { 'invalidPhoneNumber': true };
  };
}