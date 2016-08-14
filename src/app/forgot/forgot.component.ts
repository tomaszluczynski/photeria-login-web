import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {FormHelper} from "../FormHelper";
import {ProfileService} from "../service/ProfileService";


@Component({
  moduleId: module.id,
  selector: 'app-forgot',
  templateUrl: 'forgot.component.html',
  styleUrls: ['forgot.component.css'],
  providers: [FormHelper, ProfileService],
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})
export class ForgotComponent {
  submitted = false;
  responseMessage: String;
  forgotForm: FormGroup;

  constructor(private profileService: ProfileService, fb: FormBuilder, private fh: FormHelper) {
    this.forgotForm = fb.group({
      'username': ['', Validators.compose([Validators.minLength(4)])],
      'email': ['', Validators.compose([fh.emailValidator])]
    });
  }

  submit(form: any) {
    this.submitted = true;
    setTimeout(() => {
      this.profileService.forgotPassword(form.username, form.email).subscribe(
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
