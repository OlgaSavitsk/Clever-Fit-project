import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import { authReducer } from './auth';
import { errorReducer } from './error';
import { feedbacksReducer } from './feedbacks';
import { loaderReducer } from './loader';
import { palsReducer } from './pals';
import { trainingReducer } from './training';
import { userReducer } from './user';

const { routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

const reducer = combineReducers({
    router: routerReducer,
    authStore: authReducer,
    feedbacksStore: feedbacksReducer,
    loader: loaderReducer,
    error: errorReducer,
    trainingStore: trainingReducer,
    userStore: userReducer,
    palsStore: palsReducer
});

export default reducer;
