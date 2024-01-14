import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordHide'
})
export class PasswordHidePipe implements PipeTransform {
    transform(password: string): string {
        if (!password || typeof password !== 'string') {
          return '';
        }
        const asterisksToShow = 8;
    
        return '*'.repeat(asterisksToShow);
      }
}