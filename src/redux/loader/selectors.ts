import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';

export const selectLoading = () => UseMemmoisedSelector(({ loader }: RootState) => loader.isLoading);
