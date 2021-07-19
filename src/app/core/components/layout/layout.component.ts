import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoaded,
  selectSearchType,
  selectTicketsByAllFiltersAndSort,
  selectTransfers,
  ticketsLoading,
} from '@store/tickets/tickets.selectors';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { changeFilter, loadTickets } from '@store/tickets/tickets.actions';
import { searchType, SearchTypes } from '@shared/consts/search-type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  links: { id: SearchTypes; name: string }[] = Object.keys(searchType).map((id) => ({
    id: id as SearchTypes,
    name: searchType[id as keyof typeof searchType],
  }));

  transfers$ = this.store.select(selectTransfers).pipe(distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)));
  tickets$ = this.store.select(selectTicketsByAllFiltersAndSort);
  ticketsLoading$ = this.store.select(ticketsLoading);
  ticketsLoaded$ = this.store.select(selectLoaded);
  activeSearchType$ = this.store.select(selectSearchType).pipe(distinctUntilChanged((prev, next) => prev === next));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.ticketsLoaded$
      .pipe(
        filter((loaded) => !loaded),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(loadTickets());
      });
  }

  updateSort(newSearchType: SearchTypes): void {
    this.store.dispatch(changeFilter({ filter: { newSearchType } }));
  }

  updateFilter(newFilter: { [key: string]: boolean }): void {
    let selectedTransfers = Object.keys(newFilter)
      .filter((num) => newFilter[num])
      .map((num) => Number(num));
    if (!selectedTransfers.length) {
      selectedTransfers = Object.keys(newFilter).map((num) => Number(num));
    }
    this.store.dispatch(changeFilter({ filter: { selectedTransfers } }));
  }
}
