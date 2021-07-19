import { Ticket } from '@core/interfaces/ticket.interface';
import { createReducer, on } from '@ngrx/store';
import { changeFilter, loadTickets, loadTicketsSuccess } from '@store/tickets/tickets.actions';
import { loadTokenFailure } from '@store/auth/auth.actions';
import { searchType, SearchTypes } from '@shared/consts/search-type';

export const ticketsFeatureKey = 'tickets';

export interface TicketsState {
  loading: boolean;
  tickets: Ticket[];
  loaded: boolean;

  selectedTransfers: number[];
  searchType: SearchTypes;
}

const initialState: TicketsState = { loading: false, tickets: [], loaded: false, selectedTransfers: [], searchType: 'cheapest' };

export const ticketsReducer = createReducer(
  initialState,
  on(loadTickets, (state) => ({ ...state, loading: true })),
  on(loadTicketsSuccess, (state, { tickets }) => ({ ...state, loading: false, tickets, loaded: false })),
  on(loadTokenFailure, (state) => ({ ...state, loading: false })),
  on(changeFilter, (state, payload) => {
    let newState = { ...state };
    if (payload.filter.newSearchType) {
      newState = { ...newState, searchType: payload.filter.newSearchType };
    }
    if (payload.filter.selectedTransfers) {
      newState = { ...newState, selectedTransfers: payload.filter.selectedTransfers };
    }
    return newState;
  })
);
