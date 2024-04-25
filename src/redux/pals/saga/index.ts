import { call, put, takeLatest } from 'redux-saga/effects';
import { HttpStatusCode } from '@constants/index';
import { trainingApi } from '@services/index';
import { AxiosResponse, isAxiosError } from 'axios';

import {
    cancelInviteSuccess,
    createInviteSuccess,
    responseInviteSuccess,
    setErrorPals,
    setInvite,
    setLoadingPals,
    setTrainingPals,
    setUserJointList,
} from '../actions';
import {
    InvitePayload,
    InviteResponse,
    InviteResponseRequest,
    JointListPayload,
    PalsAction,
    PalsTypes,
} from '../types';

function* palsGetWorker() {
    try {
        const { data } = yield call(trainingApi.getTrainingPals);

        yield put(setTrainingPals(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorPals(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
}

function* inviteGetWorker() {
    try {
        const { data } = yield call(trainingApi.getInvite);

        yield put(setInvite(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorPals(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
}

function* inviteCreateWorker(actions: PalsAction<InvitePayload>) {
    try {
        const { data } = yield call(trainingApi.postTraining, actions.payload.training);
        const payload = {
            to: actions.payload.id,
            trainingId: data._id,
        };
        const invite: AxiosResponse<InviteResponse> = yield call(trainingApi.createInvite, payload);

        yield put(createInviteSuccess(invite.data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorPals(HttpStatusCode.NOT_FOUND));
        }
    }
}

function* inviteResponseWorker(actions: PalsAction<InviteResponseRequest>) {
    try {
        yield call(trainingApi.responseInvite, actions.payload);
        const { data } = yield call(trainingApi.getTrainingPals);

        yield put(setTrainingPals(data));

        yield put(responseInviteSuccess());
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorPals(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
}

function* inviteCancelWorker(actions: PalsAction<InviteResponseRequest>) {
    yield put(setLoadingPals(true));
    try {
        yield call(trainingApi.cancelInvite, actions.payload.id);
        const { data } = yield call(trainingApi.responseInvite, actions.payload);

        yield put(cancelInviteSuccess(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorPals(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
    yield put(setLoadingPals(false));
}

function* userJointListGetWorker(actions?: PalsAction<JointListPayload>) {
    try {
        const { data } = yield call(trainingApi.getUserJointList, actions?.payload);

        yield put(setUserJointList(data));
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            yield put(setErrorPals(HttpStatusCode.INTERNAL_SERVER_ERROR));
        }
    }
}

function* handleGetPals() {
    yield put(setErrorPals(undefined));
    yield call(palsGetWorker);
}

function* handleGetInvite() {
    yield put(setErrorPals(undefined));
    yield call(inviteGetWorker);
}

function* handleCreateInvite(actions: PalsAction<InvitePayload>) {
    yield put(setLoadingPals(true));
    yield call(inviteCreateWorker, actions);
    yield put(setLoadingPals(false));
}

function* handleResponseInvite(actions: PalsAction<InviteResponseRequest>) {
    yield put(setLoadingPals(true));
    yield call(inviteResponseWorker, actions);
    yield put(setLoadingPals(false));
}

function* handleGetUserJointList(actions?: PalsAction<JointListPayload>) {
    yield put(setLoadingPals(true));
    yield put(setErrorPals(undefined));
    yield call(userJointListGetWorker, actions);
    yield put(setLoadingPals(false));
}

export function* watchPals() {
    yield takeLatest(PalsTypes.GET_TRAINING_PALS, handleGetPals);
    yield takeLatest(PalsTypes.GET_INVITE, handleGetInvite);
    yield takeLatest(PalsTypes.GET_USER_JOINT_LIST, handleGetUserJointList);
    yield takeLatest(PalsTypes.CREATE_INVITE_REQUEST, handleCreateInvite);
    yield takeLatest(PalsTypes.RESPONSE_INVITE_REQUEST, handleResponseInvite);
    yield takeLatest(PalsTypes.CANCEL_INVITE_REQUEST, inviteCancelWorker);
}
