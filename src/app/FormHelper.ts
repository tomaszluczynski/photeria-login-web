import {Injectable} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";

@Injectable()
export class FormHelper {

  constructor() {

  }

  isInvalid(form: FormGroup, fieldName: string): boolean {
    let invalid = !form.controls[fieldName].valid &&
      form.controls[fieldName].touched;
    return invalid;
  }

  hasError(form: FormGroup, error: string, fieldName: string): boolean {
    let hasError = form.hasError(error, [fieldName]) &&
      form.controls[fieldName].touched;
    return hasError;
  }

  emailValidator(control: FormControl) {
    var EMAIL_REGEXP = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i;

    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return {"incorrectMailFormat": true};
    }

    return null;
  }

  passwordValidator(group: FormGroup) {
    if (group.controls['password'].value == group.controls['password2'].value
      || !group.controls['password2'].dirty) {
      return null;
    } else {
      return {"passwordMismatch": true}
    }
  }
}
