import {Component, Input, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Ticket, TicketsService, TicketStatus} from '../../tickets/tickets.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";

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
    @Input() search: string;

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

    ngAfterViewInit() {
        let inputElm = document.getElementById("searchTextField");
        Observable.fromEvent(inputElm, 'keyup').debounceTime(200).subscribe(res => {
            console.log(this.search)
            // this will wait for 200ms and then this will called on input
            // call you api here like
            // this.get(searchText).subscribe();
        });
    }

}
