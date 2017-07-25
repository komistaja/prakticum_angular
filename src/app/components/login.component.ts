import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { DataService } from '../data.service';

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
    redirectUrl = '/logged';

    constructor(
        private http: Http,
        private router: Router,
        private dataService: DataService) {}

    onLoginClick(user: User) {
        if (!user.name) {
            this.errorMessage = 'empty username';
            return;
        }
        this.dataService.login(user)
                    .subscribe(
                        person  => {console.log(person); this.router.navigate([this.redirectUrl]); },
                        error =>  this.errorMessage = <any>error);
    }
 }
