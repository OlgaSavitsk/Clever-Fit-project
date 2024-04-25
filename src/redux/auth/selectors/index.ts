import { RootState } from '@redux/configure-store';
import { UseMemmoisedSelector } from '@redux/redux.helper';
import { getPrevLocation } from '@utils/index';


export const selectAuthLoading = () => UseMemmoisedSelector(({ authStore }: RootState) => authStore.isLoading);

export const selectAuthToken = () => UseMemmoisedSelector(({ authStore }: RootState) => authStore.token as string);

export const selectLocationPath = () => UseMemmoisedSelector(({ router }: RootState) => router.location?.pathname);

export const selectPreviousLocations = () => UseMemmoisedSelector(({ router }: RootState) => getPrevLocation(router));

export const selectAuthStatusCode = () => UseMemmoisedSelector(({ authStore }: RootState) => authStore.statusCode);

export const selectAuthEmail = () => UseMemmoisedSelector(({ router }: RootState) => router.location?.state as string);
