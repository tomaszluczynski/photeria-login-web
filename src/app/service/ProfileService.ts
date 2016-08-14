import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Login} from "../model/Login";
import {QueryResult} from "../model/QueryResult";
import {Register} from "../model/Register";
import {Forgot} from "../model/Forgot";

@Injectable()
export class ProfileService {

  private URL_LOGIN = '/login';
  private URL_REGISTER = '/register';
  private URL_FORGOTPASSWORD = '/forgotpassword';

  constructor(private http: Http) {
  }

  login(username, password): Observable<QueryResult> {
    let loginDetails = new Login(username, password);
    return this.query(this.URL_LOGIN, loginDetails);
  }

  register(username, password, email, firstName, lastName): Observable<QueryResult> {
    let registerDetails = new Register(username, password, email, firstName, lastName);
    return this.query(this.URL_REGISTER, registerDetails);
  }

  forgotPassword(username, email): Observable<QueryResult> {
    let forgotDetails = new Forgot(username, email);
    return this.query(this.URL_FORGOTPASSWORD, forgotDetails);
  }

  private query(url: string, payload) {
    let body = JSON.stringify(payload);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
