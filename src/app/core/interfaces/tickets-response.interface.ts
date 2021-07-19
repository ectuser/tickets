import { Ticket } from '@core/interfaces/ticket.interface';

export interface TicketsResponse {
  tickets: Ticket[];
  stop: boolean;
}
