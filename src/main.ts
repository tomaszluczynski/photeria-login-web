import {bootstrap} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {AppComponent, environment} from "./app/";
import {provideForms, disableDeprecatedForms} from "@angular/forms";
import {HTTP_PROVIDERS} from "@angular/http";
import {RouterConfig, provideRouter} from "@angular/router";
import {LoginComponent} from "./app/login/login.component";
import {RegisterComponent} from "./app/register/register.component";
import {ForgotComponent} from "./app/forgot/forgot.component";

if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
  {path: '', redirectTo: 'login', terminal: true},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotComponent}
];

bootstrap(AppComponent, [
  provideRouter(routes),
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,

  // mock
  /*BaseRequestOptions,
   MockBackend,
   provide(Http, {
   deps: [MockBackend, BaseRequestOptions],
   useFactory: (backend, options) => {
   return new Http(backend, options);
   },
   })*/
]);
