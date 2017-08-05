import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';

import { DataService } from '../data.service';

import { User } from '../user';

@Component({
    selector: 'login-component',
    templateUrl: '../view/login.component.html',
    styleUrls: [ '../view/login.component.css' ]
})
export class LoginComponent implements OnInit {
    errorMessage = '';
    user = new User('', '', '');
    loginUrl = 'http://localhost:3000/login';
/*     loginUrl = '/login'; */
    redirectUrl = '/logged';

    constructor(
        private http: Http,
        private router: Router,
        private dataService: DataService) {}

    ngOnInit() {
        this.onLogout();
        console.log('ngOnInit');
    }

    onLogout() {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers, params: {}});

        this.http.put('/login', options)
            .map((res: Response) => { return res.json(); })
            .catch((err: Response) => { return Observable.throw(err); });
    }

    onLoginClick(user: User) {
        if (!user.username) {
            this.errorMessage = 'empty username';
            return;
        }
        this.dataService.login(user)
                    .subscribe(
                        person  => {
                            if (person.username === 'admin') {
                                this.router.navigate(['/usermanagement']);
                            } else {
                            this.router.navigate([this.redirectUrl]);
                            }
                         },
                        error =>  this.errorMessage = <any>error);
    }
 }
