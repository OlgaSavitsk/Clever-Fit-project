import { LOCATION_CHANGE } from 'redux-first-history';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { call, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { HttpStatusCode } from '@constants/index';
import { RoutePath } from '@constants/routes.constants';
import { selectLocation } from '@redux/feedbacks';
import { setLoadingTraining } from '@redux/training/actions';
import { NotUndefined } from '@redux-saga/types';
import { userApi } from '@services/index';
import { AxiosProgressEvent, isAxiosError } from 'axios';

import {
    paymentTariffSuccess,
    putUserSuccess,
    setErrorUser,
    setTariffList,
    setUser,
    uploadFileSuccess,
    uploadProgress,
} from '../actions';
import { TariffPayment, UploadPayload, UserAction, UserPayload, UserTypes } from '..';

function* userGetWorker() {
    try {
        const { data } = yield call(userApi.getUser);

        yield put(setUser(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) {
                yield put(setErrorUser(status));
            }
        }
    }
}

function* tariffGetWorker() {
    try {
        const { data } = yield call(userApi.getTariffList);

        yield put(setTariffList(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            yield put(setErrorUser(status));
        }
    }
}

function* userPutWorker({ payload }: UserAction<UserPayload>) {
    try {
        const { data } = yield call(userApi.updateUser, payload);

        yield put(putUserSuccess(data));
        yield call(userApi.getUser);
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorUser(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
}

function* tariffPaymentWorker({ payload }: UserAction<TariffPayment>) {
    try {
        const { status } = yield call(userApi.paymentTariff, payload);

        yield put(paymentTariffSuccess(status));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(paymentTariffSuccess(null));
        }
    }
}

function createUploader(
    files: UploadPayload,
): [Promise<void>, EventChannel<NotUndefined>] | undefined {
    let emmit: (input: NotUndefined | END) => void;

    try {
        const chan = eventChannel((emmiter) => {
            emmit = emmiter;

            return () => {};
        });
        const uploadProgressCb = ({ progress }: AxiosProgressEvent) => {
            const percent = progress ? Math.ceil(progress * 100) : 0;

            emmit(percent);
            if (percent === 100) emmit(END);
        };

        const uploadPromise = userApi.uploadFile(files, uploadProgressCb);

        return [uploadPromise, chan];
    } catch (error) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status === HttpStatusCode.CONFLICT) {
                put(setErrorUser(HttpStatusCode.CONFLICT));
            }
        }

        return undefined;
    }
}

function* uploadProgressWatcher(channel: EventChannel<NotUndefined>) {
    while (true) {
        try {
            const progress: number = yield take(channel);

            yield put(uploadProgress(progress));
        } catch (err) {
            yield put(uploadProgress(0));
        }
    }
}

function* fileUploadWorker(action: UserAction<UploadPayload>) {
    try {
        const [uploadPromise, chan]: [Promise<void>, EventChannel<NotUndefined>] = yield call(
            createUploader,
            action.payload,
        );

        yield fork(uploadProgressWatcher, chan);
        const { data } = yield call(() => uploadPromise);

        yield put(uploadFileSuccess(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorUser(HttpStatusCode.CONFLICT));
        }
    }
}

export function* handleGetTariff() {
    const { pathname } = yield select(selectLocation);

    if (pathname === RoutePath.Settings) {
        yield call(tariffGetWorker);
    }
}

export function* handlePaymentTariff(action: UserAction<TariffPayment>) {
    yield put(setLoadingTraining(true));
    yield call(tariffPaymentWorker, action);
    yield put(setLoadingTraining(false));
}

export function* watchUser() {
    yield takeLatest(LOCATION_CHANGE, handleGetTariff);
    yield takeEvery(UserTypes.UPLOAD_FILE_REQUEST, fileUploadWorker);
    yield takeLatest(UserTypes.UPDATE_USER_REQUEST, userPutWorker);
    yield takeLatest(UserTypes.GET_USER, userGetWorker);
    yield takeLatest(UserTypes.PAYMENT_REQUEST, handlePaymentTariff);
}
