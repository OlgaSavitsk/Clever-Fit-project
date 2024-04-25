import { ErrorAction, ErrorPayloadType, ErrorTypes } from '@redux/error';
import { LoaderAction, LoaderTypes } from '@redux/loader';

import { FeedbackPayload, FeedbacksAction, FeedbacksResponse, FeedbacksTypes } from '../types';

export const setLoadingFeedBacks = (payload: boolean): LoaderAction<boolean> => ({
    type: LoaderTypes.SET_LOADING,
    payload,
});

export const getFeedbacks = () => ({
    type: FeedbacksTypes.GET_FEEDBACKS,
});

export const setFeedbacks = (
    payload: FeedbacksResponse[],
): FeedbacksAction<FeedbacksResponse[]> => ({
    type: FeedbacksTypes.SET_FEEDBACKS,
    payload,
});

export const postFeedbackRequest = (
    payload: FeedbackPayload,
): FeedbacksAction<FeedbackPayload> => ({
    type: FeedbacksTypes.POST_FEEDBACK_REQUEST,
    payload,
});

export const postFeedbackSuccess = () => ({
    type: FeedbacksTypes.POST_FEEDBACK_SUCCESS,
});

export const setErrorFeedbacks = (payload: ErrorPayloadType): ErrorAction<ErrorPayloadType> => ({
    type: ErrorTypes.SET_ERROR,
    payload,
});
