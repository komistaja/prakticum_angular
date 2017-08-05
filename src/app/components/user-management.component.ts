import { Component, OnChanges, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { User } from '../user';


@Component({
    selector: 'user-management',
    templateUrl: '../view/user-management.component.html',
    styleUrls: [ '../view/user-management.component.css' ]
})

export class UserManagement implements OnChanges, OnInit {
    users: User[] = [];
    user: User;
    editToggle = false;

    constructor(
        private dataService: DataService,
    ) {}

    ngOnInit() {
        console.log('ngOnInit() called');
        this.getUserList();
    }

    ngOnChanges() {
        console.log('ngOnChanges() called');
        this.getUserList();
    }

    onEdit(userName: string) {
        this.dataService.getUsers(userName)
            .subscribe(result => { this.user = result[0]; this.editToggle = true; }, error => console.log(error));
    }

    getUserList() {
        console.log('getUserlList() called');
        this.dataService.getUsers()
            .subscribe(
                result => { this.users = result; console.log(this.users); },
                error => {}
            );
    }
}
