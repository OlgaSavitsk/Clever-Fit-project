import { FeedbacksAction, FeedbacksResponse, FeedbacksState, FeedbacksTypes } from '../types';

const initialState: FeedbacksState = {
    feedbacks: [],
    statusCode: null,
};

export const feedbacksReducer = <T>(
    state = initialState,
    { type, payload }: FeedbacksAction<T>,
) => {
    switch (type) {
        case FeedbacksTypes.GET_FEEDBACKS: {
            return state;
        }
        case FeedbacksTypes.SET_FEEDBACKS: {
            return {
                ...state,
                feedbacks: payload as FeedbacksResponse[],
            };
        }
        case FeedbacksTypes.POST_FEEDBACK_REQUEST: {
            return { ...state, statusCode: undefined };
        }
        case FeedbacksTypes.POST_FEEDBACK_SUCCESS: {
            return state;
        }
        default:
            return state;
    }
};
