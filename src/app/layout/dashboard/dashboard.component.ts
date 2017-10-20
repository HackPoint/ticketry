import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Ticket, TicketsService, TicketStatus} from '../../tickets/tickets.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    opened: Ticket[];
    closed: Ticket[];
    inProgress: Ticket[];

    tickets$: Ticket[];
    constructor(private ticketService: TicketsService, private modalService: NgbModal) {

    }

    ngOnInit() {
        this.ticketService.get().subscribe((tickets: Ticket[]) => {
            this.tickets$ = tickets;
            this.opened = tickets.filter(x => x.status === TicketStatus.Open);
            this.closed = tickets.filter(x => x.status === TicketStatus.Done);
            this.inProgress = tickets.filter(x => x.status === TicketStatus.InProgress);
        });
    }


    open(content) {
        this.modalService.open(content).result.then((result) => {
        }, (reason) => {
        });
    }
}
