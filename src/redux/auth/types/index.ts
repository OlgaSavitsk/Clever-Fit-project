export enum AuthTypes {
    SIGNUP_REQUEST = 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNIN_REQUEST = 'SIGNIN_REQUEST',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    CHECKEMAIL_REQUEST = 'CHECKEMAIL_REQUEST',
    CHECKEMAIL_SUCCESS = 'CHECKEMAIL_SUCCESS',
    CONFIRMEMAIL_REQUEST = 'CONFIRMEMAIL_REQUEST',
    CONFIRMEMAIL_SUCCESS = 'CONFIRMEMAIL_SUCCESS',
    CHANGEPASSWORD_REQUEST = 'CHANGEPASSWORD_REQUEST',
    CHANGEPASSWORD_SUCCESS = 'CHANGEPASSWORD_SUCCESS',
    AUTH_ERROR = 'AUTH_ERROR',
    SIGNOUT = 'SIGNOUT',
}

export type AuthState = {
    token: string | undefined;
    isLoading: boolean;
    statusCode: number | null;
};

export type AuthAction<Payload> = {
    type: AuthTypes;
    payload: Payload;
};

export type AuthReducer = (state: AuthState, actions: AuthAction<AuthState>) => AuthState;

export type SignUpPayload = {
    email: string;
    password: string;
};

export type SignInPayload = {
    email: string;
    password?: string;
    remember?: boolean;
};

export type CheckAuthResponse = {
    email: string;
    message: string;
};

export type ConfirmEmailRequest = {
    email: string;
    code: string;
};
export type ChangePasswordRequest = {
    password: string;
    confirmPassword: string;
};

export type AuthResponse = {
    token: string;
};

export type AuthError = {
    statusCode: number;
    error: string;
    message: string;
};
