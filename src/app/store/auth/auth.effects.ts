import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logout, loadToken, loadTokenFailure, loadTokenSuccess } from '@store/auth/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { SearchService } from '@core/services/search.service';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { StorageService } from '@core/services/storage.service';
import { TOKEN } from '@shared/consts/storage-tokens';

@Injectable()
export class AuthEffects {
  loadToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadToken.type),
      mergeMap(() => {
        return this.searchService.getToken().pipe(
          map((data) => loadTokenSuccess({ token: data.searchId })),
          catchError(() => [loadTokenFailure()])
        );
      })
    )
  );

  loadTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadTokenSuccess.type),
        map((action: Action & { token: string }) => action),
        tap(({ token }) => {
          this.router.navigate(['../', 'flights']);
          this.storageService.setItem(TOKEN, token);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout.type),
        tap(() => {
          this.storageService.clearItem(TOKEN);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private router: Router,
    private storageService: StorageService
  ) {}
}
