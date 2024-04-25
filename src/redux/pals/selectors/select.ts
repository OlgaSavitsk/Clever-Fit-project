import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';

const select = createSelector(
    (state: RootState) => state.palsStore.pals,
    (state: RootState) => state.palsStore.invites,
    (state: RootState) => state.palsStore.joinList,
    (state: RootState) => state.palsStore.createdInvite,
    (pals, invites, joinList, createdInvite) => ({ pals, invites, joinList, createdInvite }),
);

export const selectPals = () => UseMemmoisedSelector(select);
