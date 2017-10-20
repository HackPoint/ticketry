import {Component, Input, OnInit} from '@angular/core';
import {Severity, Ticket, TicketsService, TicketStatus} from '../../../../tickets/tickets.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    @Input() title: string;
    @Input() tickets: Ticket[];
    @Input() color: string;

    constructor(private ticketService: TicketsService) {
    }
    ngOnInit() {
        /*GET*/


        /*
        * CREATE
        * */
        const newTicket = new Ticket();
        newTicket.created = new Date();
        newTicket.description = "Some lorem ipsum";
        newTicket.status = TicketStatus.InProgress;
        newTicket.severity = Severity.Low;
        newTicket.summary = " Some lorem ipsum Some lorem ipsum Some lorem ipsum Some lorem ipsumSome lorem ipsum";
        this.ticketService.create(newTicket).subscribe(() => {

        });
    }
}
