import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TicketsService {

    constructor() {
    }

    create(ticket: Ticket): Observable<boolean> {
        return Observable.of(true);
    }
}

export class Ticket {
    _id: string;
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

