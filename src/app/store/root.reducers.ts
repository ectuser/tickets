import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authFeatureKey, authReducer, AuthState } from '@store/auth/auth.reducer';
import { ticketsFeatureKey, ticketsReducer, TicketsState } from '@store/tickets/tickets.reducer';

export interface AppState {
  [authFeatureKey]: AuthState;
  [ticketsFeatureKey]: TicketsState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  tickets: ticketsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
