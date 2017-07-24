import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Ticket } from './ticket';

import { DataService } from './data.service';

@Component({
    selector: 'edit-form',
    templateUrl: 'edit-form.component.html',
    styleUrls: [ 'edit-form.component.css' ]
})

export class EditFormComponent implements OnInit {
    @Input() ticket: Ticket;
    @Output() onEdited = new EventEmitter<boolean>();

    editTicket: {};

    ngOnInit() {
        this.editTicket = {
            firstName: this.ticket.firstName,
            lastName: this.ticket.lastName,
            email: this.ticket.email,
            tel: this.ticket.tel,
            service: this.ticket.service,
            comments: this.ticket.comments,
            status: this.ticket.status,
            id: this.ticket.id
        };
    }


    constructor(
        private http: Http,
        private dataService: DataService,
    ) {}

    hideDataForm() {
        this.onEdited.emit(true);
        this.dataService.toggleDataFormState(true);
    }

    onUpdate(ticket: Ticket) {
        this.dataService.updateTicket(ticket)
                    .subscribe(
                        response  => { if (response.ok) {
                            this.onEdited.emit(true);
                            this.dataService.toggleDataFormState(true);
                        }},
                        error =>  console.log(error));
    }

    onDelete(id: number) {
        if (confirm('Are you sure to delete ticket id: ' + id)) {
            this.dataService.deleteTicket(id)
                        .subscribe(
                            response => {
                                if (response.ok) {
                                this.onEdited.emit(true);
                                this.dataService.toggleDataFormState(true);
                                }},
                            error => console.log(error)
                        );
        }
    }
}
