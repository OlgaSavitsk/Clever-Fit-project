import { LOCATION_CHANGE, push } from 'redux-first-history';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { HttpStatusCode, LocalStorageKey, RoutePath } from '@constants/index';
import { feedbacksApi } from '@services/index';
import { isAxiosError } from 'axios';

import {
    postFeedbackSuccess,
    setErrorFeedbacks,
    setFeedbacks,
    setLoadingFeedBacks,
} from '../actions';
import { selectLocation } from '../selectors';
import { FeedbackPayload, FeedbacksAction, FeedbacksTypes } from '../types';

function* feedbacksGetWorker() {
    try {
        const { data } = yield call(feedbacksApi.getFeedbacks);

        yield put(setFeedbacks(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status === HttpStatusCode.FORBIDDEN) {
                yield window.localStorage.removeItem(LocalStorageKey.authToken);
                yield put(push(RoutePath.SignIn));
            } else yield put(setErrorFeedbacks(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
}
function* feedbacksPostWorker(action: FeedbacksAction<FeedbackPayload>) {
    try {
        yield call(feedbacksApi.postFeedback, action.payload);
        yield put(postFeedbackSuccess());
        yield put(setErrorFeedbacks(HttpStatusCode.OK));
    } catch (error: unknown) {
        yield put(setErrorFeedbacks(HttpStatusCode.NOT_FOUND));
    }
}

export function* handleGetFeedbacks() {
    yield put(setLoadingFeedBacks(true));
    yield delay(100);
    const { pathname } = yield select(selectLocation);

    if (pathname === RoutePath.Feedbacks) {
        yield call(feedbacksGetWorker);
    }
    yield put(setLoadingFeedBacks(false));
}

export function* handlePostFeedbacks(action: FeedbacksAction<FeedbackPayload>) {
    yield put(setLoadingFeedBacks(true));
    yield call(feedbacksPostWorker, action);
    yield put(setLoadingFeedBacks(false));
}

export function* watchFeedbacks() {
    yield takeLatest(LOCATION_CHANGE, handleGetFeedbacks);
    yield takeLatest(FeedbacksTypes.GET_FEEDBACKS, handleGetFeedbacks);
    yield takeLatest(FeedbacksTypes.POST_FEEDBACK_REQUEST, handlePostFeedbacks);
}
