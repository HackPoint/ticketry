import {TestBed, inject} from '@angular/core/testing';

import {Ticket, TicketsService} from './tickets.service';

describe('TicketsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TicketsService]
        });
    });

    it('should be created', inject([TicketsService], (service: TicketsService) => {
        expect(service).toBeTruthy();
    }));

    it('should create new ticket', inject([TicketsService], (service: TicketsService) => {
        const ticket = new Ticket();
        service.create(ticket).subscribe((isCreated: boolean) => {
           expect(isCreated).toBeTruthy();
        });
    }));
});
