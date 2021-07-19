import { createReducer, on } from '@ngrx/store';
import { logout, loadToken, loadTokenFailure, loadTokenSuccess, setTokenFromStorage } from '@store/auth/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  token?: string;
  loadingToken: boolean;
}

export const initialState: AuthState = {
  loadingToken: false,
};

export const authReducer = createReducer(
  initialState,
  on(loadToken, (state) => ({ ...state, loadingToken: true })),
  on(loadTokenSuccess, (state, { token }) => ({ ...state, token, loadingToken: false })),
  on(loadTokenFailure, (state) => ({ ...state, loadingToken: false })),
  on(setTokenFromStorage, (state, { token }) => ({ ...state, token })),
  on(logout, (state) => ({ ...state, token: undefined }))
);
