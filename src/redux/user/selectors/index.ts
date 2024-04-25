import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';

import { TariffListResponse, UserResponse } from '../types';

export const selectUser = createSelector(
    (state: RootState) => state.userStore.user as UserResponse,
    (state: RootState) => state.userStore.progress,
    (state: RootState) => state.userStore.tariffList as TariffListResponse[],
    (state: RootState) => state.userStore.paymentStatus,
    (user, progress, tariffList, paymentStatus) => ({ user, progress, tariffList, paymentStatus }),
);

export const selectUserState = () => UseMemmoisedSelector(selectUser);
