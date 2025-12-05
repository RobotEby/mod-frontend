import { RootState } from '../../app/store';

export const selectUser = (state: RootState) => state.user.user;
export const selectSession = (state: RootState) => state.user.session;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectIsAuthenticated = (state: RootState) => !!state.user.user;
