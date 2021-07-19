import { createAction, props } from '@ngrx/store';

export const loadToken = createAction('[Auth] Load token');
export const loadTokenSuccess = createAction('[Auth] Load token success', props<{ token: string }>());
export const loadTokenFailure = createAction('[Auth] Load token failure');
export const setTokenFromStorage = createAction('[Auth] Set token from storage', props<{ token: string }>());
export const logout = createAction('[Auth] Clear token');
