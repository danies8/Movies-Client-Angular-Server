import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[imageUrlPattern]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ImageUrlValidateDirective,
    multi: true
  }]
})
export class ImageUrlValidateDirective implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && control.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
      return { 'imageUrlPattern': true }; // return object if the validation is not passed.
    }
    return null; // return null if validation is passed.
  }
}