import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[emailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidateDirective,
    multi: true
  }]
})
export class EmailValidateDirective implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && control.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      return { 'emailValidator': true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}