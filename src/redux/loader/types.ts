export enum LoaderTypes {
    SET_LOADING = 'SET_LOADING',
}

export type LoaderState = {
    isLoading?: boolean;
};

export type LoaderAction<Payload> = {
    type: LoaderTypes;
    payload: Payload;
};
