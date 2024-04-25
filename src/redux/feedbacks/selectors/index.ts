import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { createSelector } from '@reduxjs/toolkit';
import { getPrevLocation } from '@utils/index';

export const selectorFeedbacks = createSelector(
    (state: RootState) => state.feedbacksStore.feedbacks,
    (state: RootState) => state.feedbacksStore.statusCode,
    (feedbacks, statusCode) => ({ feedbacks, statusCode }),
);

export const selectLocation = createSelector(
    (state: RootState) => state.router.location?.pathname,
    ({ router }: RootState) => getPrevLocation(router),
    (pathname, previousLocations) => ({ pathname, previousLocations }),
);

export const selectFeedbacks = () => UseMemmoisedSelector(selectorFeedbacks);
