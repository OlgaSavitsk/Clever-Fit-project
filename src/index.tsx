import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { history, store } from '@redux/configure-store';
import { routes } from '@routes/routes';
import { ConfigProvider } from 'antd';

import { Loader } from './components';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

ConfigProvider.config({
    theme: {
        primaryColor: '#2f54eb'
    }
})

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
            <Loader />
        </Provider>
    </React.StrictMode>,
);
