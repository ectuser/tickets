import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';

const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectTokenLoading = createSelector(selectAuth, (state) => state.loadingToken);
export const selectToken = createSelector(selectAuth, (state) => state.token);
