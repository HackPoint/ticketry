import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

const API_ROOT: string = 'http://localhost:3000/api/tickets/';

@Injectable()
export class TicketsService {

    constructor(private http: Http) {
    }

    get(): Observable<Ticket[]> {
        return this.http.get(`${API_ROOT}`).map(res => {
            return res.json();
        }, (error) => {
        });
    }

    create(ticket: Ticket): Observable<any> {
        return this.http.post(`${API_ROOT}`, ticket, {});
    }

    update(_id: number): void {
    }
}

export class Ticket {
    _id: number;
    updated: Date;
    created: Date;
    summary: string;
    description: string;
    severity: Severity
    status: TicketStatus
}

export enum Severity {
    Low,
    Medium,
    High
};

export enum TicketStatus {
    Open,
    InProgress,
    Done
}

