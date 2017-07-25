import { Component } from '@angular/core';

import { DataService } from '../data.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'logged-component',
    templateUrl: '../view/logged.component.html',
    styleUrls: [ '../view/logged.component.css' ]
})

export class LoggedComponent {
    private searchParam = { email: '', id: '' };

    user = { email: '', id: '' };

    showResultTable = false;
    showNewTicketForm = false;

    errorMessage = '';

    constructor(
        private dataService: DataService
    ) {
        dataService.newTicketFormState.subscribe((newState: boolean) => this.showNewTicketForm = newState);
    }

    onAdd(id: string) {
        this.user = { email: '', id: id};
        console.log(id);
        this.onSearch('', id);
        this.showNewTicketForm = false;
    }

    onSearch(email: string, id: string) {
        this.searchParam = this.user;
        this.user = { email: '', id: ''};
        if (!this.showResultTable) {
            this.showResultTable = !this.showResultTable;
        }
    }

    newTicket(): void {
            this.showNewTicketForm = !this.showNewTicketForm;
    }
}
