import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { StorageService } from '@core/services/storage.service';
import { TOKEN } from '@shared/consts/storage-tokens';
import { setTokenFromStorage } from '@store/auth/auth.actions';
import { selectToken } from '@store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  selectToken$ = this.store.select(selectToken);
  constructor(private store: Store, private storageService: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate();
  }

  private validate(): Observable<boolean | UrlTree> {
    return this.selectToken$.pipe(
      take(1),
      map((token) => {
        if (token) {
          return true;
        }
        const tokenFromStorage = this.storageService.getItem(TOKEN);
        if (tokenFromStorage) {
          this.store.dispatch(setTokenFromStorage({ token: tokenFromStorage }));
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }
}
