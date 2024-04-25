import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/configure-store';

export const UseMemmoisedSelector = <T>(selector: (state: RootState) => T): T => {
    const result = useSelector(selector);

    return useMemo(() => result, [result]);
};
