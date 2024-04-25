import { Suspense, useCallback, useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
    DEFAULT_STORAGE_CONFIG,
    LocalStorageKey,
    RoutePath,
} from '@constants/index';
import { useStorage } from '@hooks/index';
import { history } from '@redux/configure-store';


export const PageConfig = () => {
    const [searchParams] = useSearchParams();
    const [token, setToken] = useStorage(
        LocalStorageKey.authToken,
        DEFAULT_STORAGE_CONFIG,
    );

    const googleAuth = useCallback(() => {
        const googleAuthToken = searchParams.get('accessToken');

        if (googleAuthToken) setToken({ accessToken: googleAuthToken })
    }, [searchParams, setToken]);

    useEffect(() => {
        googleAuth()
        if (!token.accessToken) {
            history.push(RoutePath.SignIn)
            
        } else
            if (token.accessToken) {
                history.push(RoutePath.Home)
            }
    }, [token.accessToken])

    return (
        <Suspense fallback="">
            <Outlet />
        </Suspense>
    )
}
