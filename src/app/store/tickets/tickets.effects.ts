import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SearchService } from '@core/services/search.service';
import { loadTickets, loadTicketsFailure, loadTicketsSuccess } from '@store/tickets/tickets.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTickets.type),
      switchMap(() => {
        return this.searchService.getFlights().pipe(
          map(({ tickets }) => loadTicketsSuccess({ tickets })),
          catchError(() => [loadTicketsFailure()])
        );
      })
    )
  );

  constructor(private actions$: Actions, private searchService: SearchService) {}
}
