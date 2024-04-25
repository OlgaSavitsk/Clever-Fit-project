import { Fragment } from 'react';
import {
    confirmLayout,
    LayoutType, RoutePath,
} from '@constants/index';
import { selectLocationPath } from '@redux/auth';

import { ConfirmEmailPage } from './confirm-email.page';
import { ResetPasswordPage } from './reset-password.page';

const layoutComponent = {
    [LayoutType.CONFIRM]: ConfirmEmailPage,
    [LayoutType.RESET]: ResetPasswordPage
}

export const ConfirmConfig = () => {
    const locationPathname = selectLocationPath()

    const { layout } = confirmLayout[locationPathname as RoutePath] || {}
    const Layout = layout ? layoutComponent[layout] : Fragment

    return (
        <Layout />
    )
}