import { AbstractControl } from '@angular/forms';

export function checkUsername(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
        const regex = new RegExp('^[a-zA-Z0-9_]*$');
        if (!regex.test(control.value)) {
            return {isError: true};
        }
    }
    return null;
  }
