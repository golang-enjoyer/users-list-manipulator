import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) {
      return '';
    }

    const hiddenPart = 'xxx xx xx';

    return `7 ${phoneNumber.slice(1, 4)} ${hiddenPart}`;
  }
}