import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Ticket } from './ticket';
import { User } from './user';


@Injectable()
export class DataService {
    updateUrl = 'http://localhost:3000/update';
    adminUrl = 'http://localhost:3000/admin';
    loginUrl = 'http://localhost:3000/login';

/*     updateUrl = '/update';
    adminUrl = '/admin'; */

    dataFormState: Observable<boolean>;
    newTicketFormState: Observable<boolean>;

    ticket: Ticket;


    private dataFormStateSubject: Subject<boolean>;
    private newTicketFormStateSubject: Subject<boolean>;

    constructor(
        private http: Http,
    ) {
        this.dataFormStateSubject = new Subject<boolean>();
        this.dataFormState = this.dataFormStateSubject.asObservable();

        this.newTicketFormStateSubject = new Subject<boolean>();
        this.newTicketFormState = this.newTicketFormStateSubject.asObservable();
    }

    toggleDataFormState(lastValue: boolean) {
        this.dataFormStateSubject.next(!lastValue);
        return this.dataFormState;
    }

    getNewTicketFormState(): Observable<boolean> {
        return this.dataFormState;
    }

    toggleNewTicketFormState(lastValue: boolean) {
        this.newTicketFormStateSubject.next(!lastValue);
        return this.dataFormState;
    }

    getDataFormState(): Observable<boolean> {
        return this.dataFormState;
    }


    login(user: User): Observable<User> {
        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.loginUrl, { username: user.username, password: user.password }, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateTicket(ticket: any) {
        return this.http.put(this.adminUrl, ticket)
            .map(response => response)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    search(email: string, id: number): Observable<Ticket[]> {
        let params: {};
        if (email || id) {
            params = { email: email, id: id };
        }

        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers, params: {email: email, id: id} });

        return this.http.get(this.adminUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteTicket(id: number): Observable<any> {
        return this.http.delete(this.adminUrl, { body: { id: id }})
            .map(this.extractData)
            .catch(this.handleError);
    }

    addTicket(ticket: Ticket): Observable<any> {
        return this.http.post(this.adminUrl, ticket)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUsers(userName?: string): Observable<User[]> {

        let headers = new Headers({ 'Content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers, params: {username: userName}});
        return this.http.get('http://localhost:3000/user', options) // TODO
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
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
