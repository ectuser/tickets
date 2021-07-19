import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadToken } from '@store/auth/auth.actions';
import { selectTokenLoading } from '@store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isTokenLoading$ = this.store.select(selectTokenLoading);

  constructor(private store: Store) {}

  start(): void {
    this.store.dispatch(loadToken());
  }
}
