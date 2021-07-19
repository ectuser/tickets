import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Ticket } from '@core/interfaces/ticket.interface';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsComponent {
  @Input() tickets: Ticket[] | null = [];
}
