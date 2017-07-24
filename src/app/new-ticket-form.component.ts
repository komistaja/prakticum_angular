import { Component, Output, EventEmitter } from '@angular/core';

import { Ticket } from './ticket';

import { DataService } from './data.service';

@Component({
    selector: 'new-ticket-form',
    templateUrl: 'new-ticket-form.component.html',
    styleUrls: [ 'new-ticket-form.component.css' ]
})

export class NewTicketFormComponent {
    @Output() onAdd = new EventEmitter<any>();
    newTicket = new Ticket('', '', '', '', '', '', '0', '');
    private formMessage: string;

    constructor(
        private dataService: DataService
    ) {}

    onAddTicket(ticket: Ticket) {
        this.dataService.addTicket(ticket)
                        .subscribe(
                            response => {
                                this.formMessage = 'Ticket added: id: ' + response.id;
                                this.onAdd.emit(response.id);
                            },
                            error => console.log(error)
                        );
    }

    hideNewTicketForm() {
        this.dataService.toggleNewTicketFormState(true);
    }

}
