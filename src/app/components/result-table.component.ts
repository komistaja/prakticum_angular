import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Ticket } from '../ticket';

import { DataService } from '../data.service';

@Component({
    selector: 'result-table',
    templateUrl: '../view/result-table.component.html',
    styleUrls: [ '../view/result-table.component.css' ]
})

export class ResultTableComponent implements OnChanges {
    @Input() searchParam: { email: string, id: number };
    searchUrl = 'http://localhost:3000/admin';

    orderByColumn = '';

    openEdit = false;
    openEditId: string;

    errorMessage = '';

    tickets: Ticket[] = [];
    ticket = new Ticket('', '', '', '', '', '', '', '');

    constructor(
        private http: Http,
        private dataService: DataService
    ) {
        dataService.dataFormState.subscribe((newState: boolean) => this.openEdit = newState);
    }



    ngOnChanges() {
        this.onSearchClick(this.searchParam.email, this.searchParam.id);
    }

    onSortClick(col: string) {
        if (this.orderByColumn.charAt(0) === '!') {
            this.orderByColumn = col;
        } else {
            this.orderByColumn = '!' + col;
        }
    }

    onEdit(id: string) {
        this.dataService.toggleDataFormState(this.openEdit);
        this.openEditId = id;
    }

    onSearchClick(email: string, id: number) {
        this.orderByColumn = '';
        this.dataService.search(email, id)
                            .subscribe(
                                result => {
                                    if (result[0]) {
                                        this.errorMessage = '';
                                        this.tickets = result; return;
                                    } else {
                                        this.errorMessage = 'No ticket found'; this.tickets = result; return;
                                    }
                                    },
                                error => this.errorMessage = <any>error);
    }

    onEdited(edited: boolean) {
        this.onSearchClick(this.searchParam.email, this.searchParam.id);
    }
}
