import { spawn } from 'redux-saga/effects';

import { watchAuth } from './auth/saga';
import { watchFeedbacks } from './feedbacks/saga';
import { watchPals } from './pals/saga';
import { watchTraining } from './training/saga';
import { watchUser } from './user/saga';

export default function* rootSaga() {
    yield spawn(watchAuth);
    yield spawn(watchFeedbacks);
    yield spawn(watchTraining);
    yield spawn(watchUser);
    yield spawn(watchPals);
}
