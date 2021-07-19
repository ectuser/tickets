import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '@store/auth/auth.selectors';
import { map, take } from 'rxjs/operators';
import { StorageService } from '@core/services/storage.service';
import { TOKEN } from '@shared/consts/storage-tokens';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  selectToken$ = this.store.select(selectToken);

  constructor(private store: Store, private router: Router, private storageService: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getToken().pipe(
      map((token) => {
        return token ? this.router.createUrlTree(['../', 'flights']) : true;
      })
    );
  }

  private getToken() {
    return this.selectToken$.pipe(
      take(1),
      map((token) => {
        if (token) {
          return token;
        }
        return this.storageService.getItem(TOKEN);
      })
    );
  }
}
