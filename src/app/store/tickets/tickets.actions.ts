import { createAction, props } from '@ngrx/store';
import { Ticket } from '@core/interfaces/ticket.interface';
import { SearchTypes } from '@shared/consts/search-type';

export const loadTickets = createAction('[Tickets] Load Tickets');
export const loadTicketsSuccess = createAction('[Tickets] Load Tickets Success', props<{ tickets: Ticket[] }>());
export const loadTicketsFailure = createAction('[Tickets] Load Tickets Failure');
export const changeFilter = createAction(
  '[Tickets] Change filter',
  props<{ filter: { selectedTransfers?: number[]; newSearchType?: SearchTypes } }>()
);
