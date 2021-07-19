import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@store/root.reducers';
import { ticketsFeatureKey, TicketsState } from '@store/tickets/tickets.reducer';
import { searchType } from '@shared/consts/search-type';

const selectTickets = createFeatureSelector<TicketsState>(ticketsFeatureKey);

export const ticketsLoading = createSelector(selectTickets, (state) => state.loading);
export const selectLoaded = createSelector(selectTickets, (state) => state.loaded);

export const selectTransfers = createSelector(selectTickets, (state) => {
  const transfers = new Set<number>();
  state.tickets.forEach((ticket) => {
    ticket.segments.forEach((segment) => {
      transfers.add(segment.stops.length);
    });
  });
  return Array.from(transfers);
});

export const selectFilters = createSelector(selectTickets, (state) => ({
  searchType: state.searchType,
  selectedTransfers: state.selectedTransfers,
}));

export const selectSearchType = createSelector(selectFilters, (filter) => filter.searchType);

export const selectAllTickets = createSelector(selectTickets, (state) => state.tickets);

export const selectTicketsByFilter = createSelector(selectAllTickets, selectFilters, (tickets, filter) => {
  return tickets.filter((ticket) => ticket.segments.every((segment) => filter.selectedTransfers.includes(segment.stops.length)));
});

export const selectTicketsByAllFiltersAndSort = createSelector(
  selectSearchType,
  selectTicketsByFilter,
  (newSearchType, filteredTickets) => {
    return newSearchType === 'cheapest'
      ? filteredTickets.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        })
      : filteredTickets.sort((a, b) => {
          const firstTotalTime = a.segments.map((segment) => segment.duration).reduce((prev, curr) => prev + curr);
          const secondTotalTime = b.segments.map((segment) => segment.duration).reduce((prev, curr) => prev + curr);
          if (firstTotalTime < secondTotalTime) {
            return -1;
          }
          if (firstTotalTime > secondTotalTime) {
            return 1;
          }
          return 0;
        });
  }
);
