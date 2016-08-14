import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FORM_DIRECTIVES, FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {FormHelper} from "../FormHelper";
import {ProfileService} from "../service/ProfileService";


@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [ProfileService, FormHelper],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})
export class LoginComponent {
  submitted = false;
  responseMessage: String;
  loginForm: FormGroup;

  constructor(private profileService: ProfileService, fb: FormBuilder, private fh: FormHelper) {
    this.loginForm = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  submit(form: any) {
    this.submitted = true;
    setTimeout(() => {
      this.profileService.login(form.username, form.password).subscribe(
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
