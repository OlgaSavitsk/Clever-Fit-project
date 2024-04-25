import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';

export const select = createSelector(
    (state: RootState) => state.trainingStore.trainings,
    (state: RootState) => state.trainingStore.trainingsList,
    (trainings, trainingsList) => ({ trainings, trainingsList }),
);

export const selectTraining = () => UseMemmoisedSelector(select);
