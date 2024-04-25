import { push } from 'redux-first-history';
import { call, put, takeLatest } from 'redux-saga/effects';
import { HttpStatusCode, LocalStorageKey, RoutePath, StatusText } from '@constants/index';
import { authApi } from '@services/index';
import { isAxiosError } from 'axios';

import {
    authError,
    changePasswordSuccess,
    checkEmailSuccess,
    confirmEmailSuccess,
    setLoadingAuth,
    signInSuccess,
    signUpSuccess,
} from '../actions';
import { AuthAction, AuthTypes, ConfirmEmailRequest, SignInPayload, SignUpPayload } from '../types';

type ErrorResponse = {
    statusCode: number;
    message: string;
};

function* signInWorker(action: AuthAction<SignInPayload>) {
    try {
        yield put(setLoadingAuth(true));
        const { data, status } = yield call(authApi.signIn, action.payload);

        yield put(signInSuccess(data.accessToken));
        yield put(setLoadingAuth(false));
        if (action.payload.remember) {
            yield window.localStorage.setItem(
                LocalStorageKey.authToken,
                JSON.stringify({ accessToken: data.accessToken }),
            );
        }
        if (status === HttpStatusCode.OK) yield put(push(RoutePath.Home));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) yield put(authError(status));
            yield put(push(RoutePath.SignInError));
        }
        yield put(setLoadingAuth(false));
    }
}

function* signUpWorker(action: AuthAction<SignUpPayload>) {
    try {
        const { status } = yield call(authApi.signUp, action.payload);

        yield put(signUpSuccess(status));
        yield put(push(RoutePath.SignUpSuccess));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) yield put(authError(status));
            if (status === HttpStatusCode.CONFLICT) {
                yield put(push(RoutePath.SignUpFailed));
            } else {
                yield put(push(RoutePath.Error, action.payload));
            }
        }
    }
}

function* checkEmailWorker(action: AuthAction<SignInPayload>) {
    try {
        const { status } = yield call(authApi.checkEmail, action.payload);

        yield put(push(RoutePath.ConfirmEmail, action.payload.email));
        yield put(checkEmailSuccess(status));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const statusCode = error.response?.status;
            const { message } = error.response?.data as ErrorResponse;

            if (statusCode) yield put(authError(statusCode));
            if (statusCode === HttpStatusCode.NOT_FOUND && message === StatusText.NOT_FOUND) {
                yield put(push(RoutePath.CheckemailNoExist));
            } else if (
                statusCode ||
                (statusCode === HttpStatusCode.NOT_FOUND && message === StatusText.EMPTY_MESSAGE)
            ) {
                yield put(push(RoutePath.CheckemailError, action.payload));
            }
        }
    }
}

function* confirmEmailWorker(action: AuthAction<ConfirmEmailRequest>) {
    try {
        yield call(authApi.confirmEmail, action.payload);
        yield put(confirmEmailSuccess());
        yield put(push(RoutePath.ResetPassword));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) yield put(authError(status));
        }
    }
}

function* changePasswordWorker(action: AuthAction<ConfirmEmailRequest>) {
    try {
        const { status } = yield call(authApi.changePassword, action.payload);

        yield put(push(RoutePath.ChangePasswordSuccess));
        yield put(changePasswordSuccess(status));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            const status = error.response?.status;

            if (status) yield put(authError(status));
            yield put(push(RoutePath.ChangePasswordError, action.payload));
        }
    }
}

export function* watchAuth() {
    yield takeLatest(AuthTypes.SIGNUP_REQUEST, signUpWorker);
    yield takeLatest(AuthTypes.SIGNIN_REQUEST, signInWorker);
    yield takeLatest(AuthTypes.CHECKEMAIL_REQUEST, checkEmailWorker);
    yield takeLatest(AuthTypes.CONFIRMEMAIL_REQUEST, confirmEmailWorker);
    yield takeLatest(AuthTypes.CHANGEPASSWORD_REQUEST, changePasswordWorker);
}
