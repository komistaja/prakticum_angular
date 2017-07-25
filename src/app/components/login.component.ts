import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../user';

@Component({
    selector: 'login-component',
    templateUrl: '../view/login.component.html',
    styleUrls: [ '../view/login.component.css' ]
})
export class LoginComponent {
    errorMessage = '';
    user = new User('', '');
     loginUrl = 'http://localhost:3000/login';
/*     loginUrl = '/login'; */
    returnUrl = '/logged';

    constructor(
        private http: Http,
        private router: Router) {}

    onLoginClick(user: User) {
        if (!user.name) {
            this.errorMessage = 'empty username';
            return;
        }
        this.login(user)
                    .subscribe(
                        person  => this.router.navigate([this.returnUrl]),
                        error =>  this.errorMessage = <any>error);
    }

    login(user: User): Observable<User> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let request = this.http.post(this.loginUrl, { username: this.user.name, password: this.user.password }, options)
            .map(this.extractData)
            .catch(this.handleError);
        return request;
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log('extractdata: ', body);
        return body.data || {};
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }
 }
