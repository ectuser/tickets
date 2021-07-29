import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '@store/auth/auth.selectors';
import { catchError, mergeMap, retryWhen, switchMap, take } from 'rxjs/operators';
import { logout } from '@store/auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

const LOGOUT_SNACKBAR_DURATION = 10000;
const RETRY_SNACKBAR_DURATION = 4000;

@Injectable()
export class TicketsInterceptor implements HttpInterceptor {
  token$ = this.store.select(selectToken);
  constructor(private store: Store, private snackBar: MatSnackBar) {}

  // todo - add tests

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return (
      !request.url.endsWith('tickets')
        ? next.handle(request)
        : this.token$.pipe(
            take(1),
            switchMap((token) => {
              const newRequest = request.clone({
                url: request.url + '?searchId=' + token,
              });
              return next.handle(newRequest);
            })
          )
    ).pipe(
      retryWhen((attempts: Observable<HttpErrorResponse>) => {
        const maxRetryAttempts = 3;
        const statusCodeToRetry = 500;
        const scalingDuration = 1000;

        return attempts.pipe(
          mergeMap((error, i) => {
            const retryAttempt = i + 1;
            if (retryAttempt > maxRetryAttempts || error.status !== statusCodeToRetry) {
              return throwError(error);
            }
            this.snackBar.open('There is probably a network issue. Trying again', undefined, { duration: RETRY_SNACKBAR_DURATION });
            return timer(retryAttempt * scalingDuration);
          })
        );
      }),
      catchError((error) => {
        this.store.dispatch(logout());
        this.snackBar.open('Your session has been expired. Please sign in again', undefined, { duration: LOGOUT_SNACKBAR_DURATION });
        throw error;
      })
    );
  }
}
