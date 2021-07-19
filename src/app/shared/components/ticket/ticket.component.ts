import { Component, Input } from '@angular/core';
import { Ticket } from '@core/interfaces/ticket.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() ticket?: Ticket;
}
