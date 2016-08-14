import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormHelper} from "../FormHelper";
import {ProfileService} from "../service/ProfileService";


@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: [FormHelper, ProfileService],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})
export class RegisterComponent {
  submitted = false;
  responseMessage: String;
  registrationForm: FormGroup;

  constructor(private profileService: ProfileService, fb: FormBuilder, private fh: FormHelper) {
    this.registrationForm = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'password2': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'email': ['', Validators.compose([Validators.required, fh.emailValidator])],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
    }, {
      validator: fh.passwordValidator
    });
  }

  submit(form: any) {
    this.submitted = true;
    setTimeout(() => {
      this.profileService.register(form.username, form.password, form.email, form.firstName, form.lastName).subscribe(
        response => {
          setTimeout(() => {
            this.submitted = false;
            this.responseMessage = "Authorization failed " + response.errorMessage;
          }, 1000)
        },
        error => {
          this.submitted = false;
          this.responseMessage = "Ooops, error :( Cannot log in now";
        }
      )
    }, 1000)
  }

}
