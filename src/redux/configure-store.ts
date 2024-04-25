import { createReduxHistoryContext } from 'redux-first-history';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import reducer from './reducer';
import rootSaga from './root-saga';

const { createReduxHistory, routerMiddleware } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false })
            .concat(sagaMiddleware)
            .concat(routerMiddleware)
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
